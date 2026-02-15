import { supabase } from '../lib/supabase';
import type { Item, Message } from '../types';
import type { ResumeData } from '../types/resume';
import { initialResumeData } from './mockResume';

const BUCKET_NAME = 'reflections-images';

export const storage = {
    // Items
    getItems: async (): Promise<Item[]> => {
        const { data, error } = await supabase
            .from('items')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    },

    addItem: async (item: Omit<Item, 'id' | 'createdAt'>) => {
        const { data, error } = await supabase
            .from('items')
            .insert(item)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    updateItem: async (id: string, item: Partial<Item>) => {
        const { data, error } = await supabase
            .from('items')
            .update(item)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    deleteItem: async (id: string) => {
        const { error } = await supabase
            .from('items')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    getItemsBySection: async (sectionId: string): Promise<Item[]> => {
        const { data, error } = await supabase
            .from('items')
            .select('*')
            .eq('section_id', sectionId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    },

    // Resume
    getResume: async (): Promise<ResumeData> => {
        const { data, error } = await supabase
            .from('resume')
            .select('data')
            .eq('id', 1)
            .single();

        if (error && error.code !== 'PGRST116') { // Ignore not found error
            console.error('Error fetching resume:', error);
            return initialResumeData;
        }

        if (!data) {
            // Initialize if not exists
            await storage.saveResume(initialResumeData);
            return initialResumeData;
        }

        return data.data;
    },

    saveResume: async (data: ResumeData) => {
        const { error } = await supabase
            .from('resume')
            .upsert({ id: 1, data, updated_at: new Date().toISOString() });

        if (error) throw error;
        return data;
    },

    // Storage
    uploadImage: async (file: File): Promise<string> => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(filePath);

        return data.publicUrl;
    },

    // Messages
    getMessages: async (): Promise<Message[]> => {
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    },

    addMessage: async (message: Omit<Message, 'id' | 'created_at'>) => {
        const { data, error } = await supabase
            .from('messages')
            .insert(message)
            .select()
            .single();

        if (error) throw error;
        return data;
    }
};
