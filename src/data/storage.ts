import type { Item } from '../types';
import type { ResumeData } from '../types/resume';
import { initialItems } from './mockData';
import { initialResumeData } from './mockResume';

const STORAGE_KEY = 'reflections_items';
const RESUME_STORAGE_KEY = 'reflections_resume';

export const storage = {
    getItems: (): Item[] => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            // Initialize with mock data if empty
            localStorage.setItem(STORAGE_KEY, JSON.stringify(initialItems));
            return initialItems;
        }
        return JSON.parse(stored);
    },

    addItem: (item: Item) => {
        const items = storage.getItems();
        const newItems = [item, ...items];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
        return newItems;
    },

    deleteItem: (id: string) => {
        const items = storage.getItems();
        const newItems = items.filter(item => item.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
        return newItems;
    },

    getItemsBySection: (sectionId: string): Item[] => {
        const items = storage.getItems();
        return items.filter(item => item.sectionId === sectionId);
    },

    // Resume Methods
    getResume: (): ResumeData => {
        const saved = localStorage.getItem(RESUME_STORAGE_KEY);
        if (!saved) {
            localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(initialResumeData));
            return initialResumeData;
        }
        return JSON.parse(saved);
    },

    saveResume: (data: ResumeData) => {
        localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(data));
        return data;
    }
};
