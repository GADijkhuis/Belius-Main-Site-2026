import {createClient} from '@supabase/supabase-js';
import {NewsModel} from "../models/NewsModel";

export const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL || "",
    process.env.REACT_APP_SUPABASE_ANON_KEY || ""
);

export const fetchNewsItemsFromDatabase = async (amount: number | null = null) => {
    const result = await supabase.from(`news`)
        .select(`*`)
        .order(`date`, { ascending: false });

    if (result.error || !result.data) {
        console.error(result.error);
        return null;
    }

    const parsedIntoModel: NewsModel[] = result.data.map((data: any) => ({
        ...data
    }));

    if (amount) {
        return parsedIntoModel.slice(0, amount);
    }

    return parsedIntoModel;
}

export const addNewsItemToDatabase = async (newsItem: Partial<NewsModel>) => {
    const result = await supabase.from(`news`).insert(newsItem).select().single();

    if (result.error || !result.data) {
        console.error(result.error);
        return null;
    }

    return result.data as NewsModel;
}

export const updateNewsItemInDatabase = async (id: number, newsItem: Partial<NewsModel>) => {
    const result = await supabase.from(`news`).update(newsItem).eq('id', id).select().single();

    if (result.error || !result.data) {
        console.error(result.error);
        return null;
    }

    return result.data as NewsModel;
}

export const deleteNewsItemFromDatabase = async (id: number) => {
    const result = await supabase.from(`news`).delete().eq('id', id);

    if (result.error) {
        console.error(result.error);
        return null;
    }

    return true;
}

export const uploadImageToDatabase = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
        .from('news-images')
        .upload(fileName, file);

    if (error) {
        console.error(error);
        return null;
    }

    const { data: publicUrlData } = supabase.storage
        .from('news-images')
        .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
};

