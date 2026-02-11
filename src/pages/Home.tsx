import React, { useState } from 'react';
import { sections } from '../data/mockData';
import type { Section } from '../types';
import { SectionModal } from '../components/SectionModal';

export default function Home() {
    const [selectedSection, setSelectedSection] = useState<Section | null>(null);

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                        Welcome to My Digital Garden
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light">
                        A collection of my thoughts, creations, and experiences.
                    </p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
                    {sections.map((section) => (
                        <div
                            key={section.id}
                            onClick={() => setSelectedSection(section)}
                            className="group relative rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <img
                                src={section.coverImage}
                                alt={section.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                            <div className="absolute bottom-0 left-0 p-6 w-full">
                                <h3 className="text-white text-2xl font-bold tracking-tight mb-1 transform translate-y-0 group-hover:-translate-y-1 transition-transform">
                                    {section.title}
                                </h3>
                                <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 line-clamp-2">
                                    {section.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <SectionModal
                section={selectedSection}
                onClose={() => setSelectedSection(null)}
            />
        </>
    );
}
