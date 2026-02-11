export interface ResumeProfile {
    name: string;
    title: string;
    email: string;
    phone?: string;
    location: string;
    summary: string;
    website?: string;
    linkedin?: string;
    github?: string;
}

export interface ResumeExperience {
    id: string;
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string; // "Present" if current
    description: string[]; // Bullet points
}

export interface ResumeEducation {
    id: string;
    school: string;
    degree: string;
    fieldOfStudy: string;
    location: string;
    startDate: string;
    endDate: string;
}

export interface ResumeSkill {
    category: string;
    items: string[];
}

export interface ResumeData {
    profile: ResumeProfile;
    experience: ResumeExperience[];
    education: ResumeEducation[];
    skills: ResumeSkill[];
}
