export type SectionId =
    | 'explorations'
    | 'philosophy'
    | 'photography'
    | 'projects'
    | 'motivation'
    | 'watchlist'
    | 'life-events'
    | 'resume'
    | 'contact';

export interface Section {
    id: SectionId;
    title: string;
    description: string;
    coverImage?: string; // Optional cover image for the tile
}

export type ItemType = 'link' | 'photo' | 'article';

export interface Item {
    id: string;
    section_id: SectionId; // Renamed from sectionId
    genre?: string;
    type: ItemType;
    title: string;
    caption?: string;
    content: string;
    created_at: string; // Renamed from createdAt and changed to string (ISO)
    image?: string; // Optional cover image for links and articles
}

export interface Message {
    id: string;
    name: string;
    email: string;
    phone?: string;
    message: string;
    created_at: string;
}
