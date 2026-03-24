export interface NewsModel {
    id: number;
    created_at: Date;
    date: Date;
    title: string;
    image_url: string;
    description: string | null;
    category: string | null;
    link: string | null;
}