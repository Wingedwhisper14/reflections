import { useState, useEffect } from 'react';
import { Download, Mail, Globe, Linkedin, Github, MapPin } from 'lucide-react';
import { initialResumeData } from '../data/mockResume';
import type { ResumeData } from '../types/resume';

export default function ResumePage() {
    const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);

    // In a real app, you might fetch this from localStorage or an API
    useEffect(() => {
        const savedData = localStorage.getItem('resumeData');
        if (savedData) {
            try {
                setResumeData(JSON.parse(savedData));
            } catch (e) {
                console.error('Failed to parse saved resume data', e);
            }
        }
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

            {/* Header / Profile Section */}
            <header className="mb-12 border-b border-gray-200 dark:border-gray-700 pb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                            {resumeData.profile.name}
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">
                            {resumeData.profile.title}
                        </p>
                        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500 dark:text-gray-500">
                            {resumeData.profile.location && (
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" /> {resumeData.profile.location}
                                </span>
                            )}
                            {resumeData.profile.email && (
                                <a href={`mailto:${resumeData.profile.email}`} className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                                    <Mail className="w-4 h-4" /> {resumeData.profile.email}
                                </a>
                            )}
                            {resumeData.profile.website && (
                                <a href={resumeData.profile.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                                    <Globe className="w-4 h-4" /> Portfolio
                                </a>
                            )}
                            {resumeData.profile.linkedin && (
                                <a href={resumeData.profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                                    <Linkedin className="w-4 h-4" /> LinkedIn
                                </a>
                            )}
                            {resumeData.profile.github && (
                                <a href={resumeData.profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                                    <Github className="w-4 h-4" /> GitHub
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Action Button (e.g. Download PDF - Placeholder) */}
                    <button
                        className="px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm"
                        onClick={() => window.print()}
                    >
                        <Download className="w-4 h-4" />
                        Download PDF
                    </button>
                </div>

                <div className="mt-8 prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                    <p>{resumeData.profile.summary}</p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                {/* Main Content: Experience & Education */}
                <div className="md:col-span-2 space-y-12">

                    {/* Experience Section */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                            Experience
                        </h2>
                        <div className="space-y-8">
                            {resumeData.experience.map((exp) => (
                                <div key={exp.id} className="relative pl-8 border-l border-gray-200 dark:border-gray-700">
                                    <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded-full border border-white dark:border-gray-900"></div>
                                    <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            {exp.position}
                                        </h3>
                                        <span className="text-sm text-gray-500 dark:text-gray-500 font-mono whitespace-nowrap">
                                            {exp.startDate} — {exp.endDate}
                                        </span>
                                    </div>
                                    <div className="text-lg text-gray-700 dark:text-gray-300 mb-2 font-medium">
                                        {exp.company} <span className="text-gray-400 dark:text-gray-600">•</span> <span className="text-sm font-normal text-gray-500">{exp.location}</span>
                                    </div>
                                    <ul className="list-disc list-outside ml-4 text-gray-600 dark:text-gray-400 space-y-1">
                                        {exp.description.map((point, index) => (
                                            <li key={index}>{point}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Education Section */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                            Education
                        </h2>
                        <div className="space-y-8">
                            {resumeData.education.map((edu) => (
                                <div key={edu.id}>
                                    <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-1">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {edu.school}
                                        </h3>
                                        <span className="text-sm text-gray-500 dark:text-gray-500 font-mono whitespace-nowrap">
                                            {edu.startDate} — {edu.endDate}
                                        </span>
                                    </div>
                                    <div className="text-gray-700 dark:text-gray-300">
                                        {edu.degree} in {edu.fieldOfStudy}
                                    </div>
                                    <div className="text-sm text-gray-500">{edu.location}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>

                {/* Sidebar: Skills */}
                <div className="md:col-span-1 border-l border-gray-100 dark:border-gray-800 md:pl-8">
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6 uppercase tracking-wider text-sm">
                            Skills
                        </h2>
                        <div className="space-y-8">
                            {resumeData.skills.map((skillGroup, index) => (
                                <div key={index}>
                                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                        {skillGroup.category}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {skillGroup.items.map((skill) => (
                                            <span
                                                key={skill}
                                                className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-sm font-medium"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

            </div>
        </div>
    );
}
