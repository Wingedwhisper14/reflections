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
    sectionId: SectionId;
    genre?: string; // e.g., "Philosophy", "Tech", "Sci-Fi"
    type: ItemType;
    title: string;
    caption?: string;
    content: string; // URL for link/photo, or Markdown/Text for article
    createdAt: number;
}
