import {createClient} from '@supabase/supabase-js';
import {NewsModel} from "../models/NewsModel";

export const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL || "",
    process.env.REACT_APP_SUPABASE_ANON_KEY || ""
);

export const fetchNewsItemsFromDatabase = async (amount: number | null = null) => {
    const result = await supabase.from(`news`)
        .select(`*`)
        .order(`date`, { ascending: true });

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