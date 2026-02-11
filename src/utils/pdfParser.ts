import * as pdfjsLib from 'pdfjs-dist';

// Set the worker source properly for Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export async function parsePdf(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
            .map((item: any) => item.str)
            .join(' ');
        fullText += pageText + '\n';
    }

    return fullText;
}

export function extractResumeData(text: string) {
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

    // Naive extraction logic
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
    const emailMatch = text.match(emailRegex);

    // Attempt to find a name (usually first line or near top)
    // This is very heuristic-based
    const name = lines[0] || '';

    // Attempt to find links
    const linkedinMatch = text.match(/linkedin\.com\/in\/([a-zA-Z0-9_-]+)/);
    const githubMatch = text.match(/github\.com\/([a-zA-Z0-9_-]+)/);
    const websiteMatch = text.match(/(https?:\/\/[^\s]+)/);

    // Section Extraction Helper
    const extractSection = (keywords: string[]): string[] => {
        const startIndex = lines.findIndex(line =>
            keywords.some(k => line.toLowerCase().includes(k.toLowerCase())) && line.length < 30
        );

        if (startIndex === -1) return [];

        const sectionLines: string[] = [];
        for (let i = startIndex + 1; i < lines.length; i++) {
            const line = lines[i];
            // Stop if we hit another likely section header (short line, common keywords)
            if (['experience', 'education', 'skills', 'projects', 'languages'].some(k =>
                line.toLowerCase() === k || line.toLowerCase() === k + ':'
            )) {
                break;
            }
            sectionLines.push(line);
        }
        return sectionLines;
    };

    // Parse Experience
    const experienceLines = extractSection(['experience', 'work history', 'employment']);
    const experience = [];

    if (experienceLines.length > 0) {
        // Smart Parsing: Look for "Role | Company" pattern
        let currentRole: any = null;

        for (let i = 0; i < experienceLines.length; i++) {
            const line = experienceLines[i].trim();
            if (!line) continue;

            // Pattern 1: "Role | Company" (contains pipe)
            // We assume this marks the start of a new job
            if (line.includes('|')) {
                // Save previous role if exists
                if (currentRole) {
                    experience.push(currentRole);
                }

                const parts = line.split('|').map(s => s.trim());
                const role = parts[0];
                // If there are multiple pipes, the last one is likely the company, or we join the rest
                const company = parts.length > 1 ? parts.slice(1).join(' | ') : 'Unknown Company';

                // Initialize new role
                currentRole = {
                    id: Date.now().toString() + i,
                    company: company,
                    position: role,
                    location: '',
                    startDate: '',
                    endDate: '',
                    description: []
                };

                // Check next line for dates
                if (i + 1 < experienceLines.length) {
                    const nextLine = experienceLines[i + 1].trim();
                    // Simple date check: detected if it contains numbers and common date separators or months
                    const hasDate = /\d{4}|present|current/i.test(nextLine);
                    if (hasDate) {
                        // Attempt to split start - end
                        const dateParts = nextLine.split(/[-–—]/); // Hyphen, En dash, Em dash
                        if (dateParts.length >= 2) {
                            currentRole.startDate = dateParts[0].trim();
                            currentRole.endDate = dateParts[1].trim();
                        } else {
                            currentRole.startDate = nextLine;
                        }
                        i++; // Skip this line since we consumed it as date
                    }
                }
            } else if (currentRole) {
                // If we have an active role, append this line to description
                // Remove bullet points if present
                const cleanLine = line.replace(/^[•\-\*]\s*/, '');
                if (cleanLine) {
                    currentRole.description.push(cleanLine);
                }
            }
        }

        // Push the last role found
        if (currentRole) {
            experience.push(currentRole);
        } else {
            // Fallback: If no "|" patterns found, extract as one big block
            experience.push({
                id: Date.now().toString(),
                company: 'Parsed Experience (Review Required)',
                position: 'Unknown Role',
                location: '',
                startDate: '',
                endDate: '',
                description: experienceLines
            });
        }
    }

    // Parse Education
    const educationLines = extractSection(['education', 'academic']);
    const education = [];
    if (educationLines.length > 0) {
        education.push({
            id: Date.now().toString(),
            school: educationLines[0] || 'Unknown School',
            degree: educationLines[1] || 'Degree',
            fieldOfStudy: '',
            location: '',
            startDate: '',
            endDate: '',
        });
    }


    return {
        name: name.substring(0, 50),
        email: emailMatch ? emailMatch[0] : '',
        linkedin: linkedinMatch ? `https://linkedin.com/in/${linkedinMatch[1]}` : '',
        github: githubMatch ? `https://github.com/${githubMatch[1]}` : '',
        website: websiteMatch ? websiteMatch[0] : '',
        rawText: text,
        experience,
        education
    };
}
