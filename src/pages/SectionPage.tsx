import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Maximize2, FileText } from 'lucide-react';
import { sections } from '../data/mockData';
import { storage } from '../data/storage';
import type { Item } from '../types';

export default function SectionPage() {
    const { id } = useParams();
    const section = sections.find(s => s.id === id);
    const [items, setItems] = useState<Item[]>([]);
    const [activeGenre, setActiveGenre] = useState<string | 'all'>('all');
    const [selectedImage, setSelectedImage] = useState<Item | null>(null);

    useEffect(() => {
        if (id) {
            const sectionItems = storage.getItemsBySection(id);
            setItems(sectionItems);
        }
    }, [id]);

    if (!section) return <div>Section not found</div>;

    // Extract unique genres
    const genres = Array.from(new Set(items.map(item => item.genre).filter(Boolean))) as string[];

    const filteredItems = activeGenre === 'all'
        ? items
        : items.filter(item => item.genre === activeGenre);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
            <Link
                to="/"
                className="inline-flex items-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-8 transition-colors group"
            >
                <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                Back to Home
            </Link>

            <header className="mb-12">
                <h1 className="text-4xl font-bold mb-4">{section.title}</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 font-light max-w-3xl">
                    {section.description}
                </p>

                {genres.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-8">
                        <button
                            onClick={() => setActiveGenre('all')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeGenre === 'all'
                                ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                                }`}
                        >
                            All
                        </button>
                        {genres.map(genre => (
                            <button
                                key={genre}
                                onClick={() => setActiveGenre(genre)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeGenre === genre
                                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                                    }`}
                            >
                                {genre}
                            </button>
                        ))}
                    </div>
                )}
            </header>

            {/* Grid of Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                    <article
                        key={item.id}
                        className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 flex flex-col"
                    >
                        {/* Conditional Rendering based on Type */}
                        {item.type === 'photo' && (
                            <div
                                className="relative aspect-[4/3] cursor-pointer overflow-hidden"
                                onClick={() => setSelectedImage(item)}
                            >
                                <img
                                    src={item.content}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                                </div>
                            </div>
                        )}

                        {item.type === 'link' && (
                            <div className="h-48 bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6 border-b border-gray-100 dark:border-gray-700">
                                <ExternalLink className="w-12 h-12 text-gray-400 group-hover:text-blue-500 transition-colors" />
                            </div>
                        )}

                        {item.type === 'article' && (
                            <div className="h-48 bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6 border-b border-gray-100 dark:border-gray-700">
                                <FileText className="w-12 h-12 text-gray-400 group-hover:text-amber-500 transition-colors" />
                            </div>
                        )}

                        <div className="p-6 flex flex-col flex-grow">
                            {item.genre && (
                                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                                    {item.genre}
                                </span>
                            )}
                            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {item.type === 'link' ? (
                                    <a href={item.content} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                        {item.title}
                                    </a>
                                ) : (
                                    item.title
                                )}
                            </h3>
                            {item.caption && (
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">
                                    {item.caption}
                                </p>
                            )}

                            {/* Footer Actions */}
                            <div className="mt-auto pt-4 flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 dark:border-gray-700">
                                <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                                {item.type === 'link' && (
                                    <a
                                        href={item.content}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        Visit <ExternalLink className="w-3 h-3 ml-1" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {filteredItems.length === 0 && (
                <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400">No items found in this section yet.</p>
                </div>
            )}

            {/* Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="max-w-5xl w-full max-h-[90vh] overflow-hidden relative">
                        <img
                            src={selectedImage.content}
                            alt={selectedImage.title}
                            className="w-full h-full object-contain max-h-[85vh]"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60 text-white backdrop-blur-md">
                            <h3 className="text-lg font-bold">{selectedImage.title}</h3>
                            {selectedImage.caption && <p className="text-sm opacity-80">{selectedImage.caption}</p>}
                        </div>
                        <button
                            className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
