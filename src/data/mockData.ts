import type { Section, Item } from '../types';

export const sections: Section[] = [
    {
        id: 'explorations',
        title: 'Explorations',
        description: 'Learnings about the world around me.',
        coverImage: 'https://images.unsplash.com/photo-1761638008360-3dd0eb9a659d?auto=format&fit=crop&q=80',
    },
    {
        id: 'philosophy',
        title: 'Philosophy',
        description: 'Thoughts, ideas and mental models.',
        coverImage: 'https://images.unsplash.com/photo-1761375351465-5240a37a5809?auto=format&fit=crop&q=80',
    },
    {
        id: 'photography',
        title: 'Photography',
        description: 'Pictures and the 1000 words within them.',
        coverImage: 'https://images.unsplash.com/photo-1762343264418-1467f9394f49?auto=format&fit=crop&q=80',
    },
    {
        id: 'projects',
        title: 'Projects',
        description: 'Little things that are building me.',
        coverImage: 'https://images.unsplash.com/photo-1764258254996-c568779e68c6?auto=format&fit=crop&q=80',
    },
    {
        id: 'motivation',
        title: 'Motivation',
        description: 'An archive of little things that keep me going.',
        coverImage: 'https://images.unsplash.com/photo-1761331432581-1c75864d28bf?auto=format&fit=crop&q=80',
    },
    {
        id: 'watchlist',
        title: 'Watchlist',
        description: 'Movies, shows and books. As I read them, I will start attaching little summaries and tiny thought bubbles.',
        coverImage: 'https://images.unsplash.com/photo-1762258344624-52d8c3b74c66?auto=format&fit=crop&q=80',
    },
    {
        id: 'life-events',
        title: 'Life events',
        description: 'The secret life of Ishan Singh.',
        coverImage: 'https://images.unsplash.com/photo-1762417108293-91614140073a?auto=format&fit=crop&q=80',
    },
    {
        id: 'resume',
        title: 'Resume',
        description: 'Gotta keep it updated.',
        coverImage: 'https://images.unsplash.com/photo-1762417108285-3dcef5ae3dc7?auto=format&fit=crop&q=80',
    },
    {
        id: 'contact',
        title: 'Tell me about you',
        description: "I enjoy listening to people's stories more than anything else in the world. Tell me about you, you can be anonymous.",
        coverImage: 'https://images.unsplash.com/photo-1678250991250-beb4b9cb297b?auto=format&fit=crop&q=80',
    },
];

export const initialItems: Item[] = [
    {
        id: '1',
        sectionId: 'explorations',
        type: 'article',
        title: 'Welcome to my Explorations',
        caption: 'A first post in this new section.',
        content: 'This is where I explore new ideas and concepts.',
        createdAt: Date.now(),
    },
    {
        id: '2',
        sectionId: 'photography',
        type: 'photo',
        title: 'Mountain View',
        caption: 'A beautiful view of the mountains.',
        content: 'https://images.unsplash.com/photo-1767854507594-424e6a844672?auto=format&fit=crop&q=80',
        createdAt: Date.now(),
    }
];
