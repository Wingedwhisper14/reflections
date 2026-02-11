import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import type { Section } from '../types';
import { Link } from 'react-router-dom';

interface SectionModalProps {
    section: Section | null;
    onClose: () => void;
}

export function SectionModal({ section, onClose }: SectionModalProps) {
    if (!section) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-lg w-full overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={section.coverImage}
                        alt={section.title}
                        className="w-full h-full object-cover"
                    />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 font-light leading-relaxed">
                        {section.description}
                    </p>

                    <div className="flex justify-end">
                        <Link
                            to={`/section/${section.id}`}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:opacity-90 transition-opacity font-medium"
                        >
                            Enter Section <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
