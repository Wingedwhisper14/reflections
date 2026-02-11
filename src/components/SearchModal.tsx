import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../data/storage';
import type { Item } from '../types';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Item[]>([]);
    const navigate = useNavigate();
    const allItems = storage.getItems();

    useEffect(() => {
        if (query.trim()) {
            const lowerQuery = query.toLowerCase();
            const filtered = allItems.filter(item =>
                item.title.toLowerCase().includes(lowerQuery) ||
                (item.caption && item.caption.toLowerCase().includes(lowerQuery)) ||
                (item.content && item.content.toLowerCase().includes(lowerQuery))
            );
            setResults(filtered.slice(0, 5)); // Limit to 5 results for preview
        } else {
            setResults([]);
        }
    }, [query]);

    const handleResultClick = (item: Item) => {
        navigate(`/section/${item.sectionId}`);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 bg-black/40 backdrop-blur-sm transition-opacity">
            <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
                <div className="relative border-b border-gray-100 dark:border-gray-700">
                    <Search className="absolute left-4 top-3.5 h-6 w-6 text-gray-400" />
                    <input
                        type="text"
                        className="w-full pl-12 pr-12 py-4 bg-transparent border-0 text-lg placeholder-gray-400 focus:ring-0 dark:text-white"
                        placeholder="Search for articles, photos, links..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                    />
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-3.5 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {(query || results.length > 0) && (
                    <div className="max-h-[60vh] overflow-y-auto p-2">
                        {results.length > 0 ? (
                            <ul className="space-y-1">
                                {results.map((item) => (
                                    <li key={item.id}>
                                        <button
                                            onClick={() => handleResultClick(item)}
                                            className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-center justify-between group transition-colors"
                                        >
                                            <div>
                                                <h4 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                                    {item.title}
                                                </h4>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                                                    {item.caption || item.content}
                                                </p>
                                            </div>
                                            <span className="text-xs text-gray-400 capitalize bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                                {item.type}
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : query ? (
                            <div className="px-4 py-8 text-center text-gray-500">
                                No results found for "{query}"
                            </div>
                        ) : null}
                    </div>
                )}

                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-500 border-t border-gray-100 dark:border-gray-700 flex justify-between">
                    <span>Search functionality</span>
                    <span>Press ESC to close</span>
                </div>
            </div>
        </div>
    );
}
