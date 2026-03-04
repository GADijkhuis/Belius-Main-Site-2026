import {createClient} from '@supabase/supabase-js';
import {NewsModel} from "../models/NewsModel";

export const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL || "",
    process.env.REACT_APP_SUPABASE_ANON_KEY || ""
);

export const fetchNewsItemsFromDatabase = async () => {
    try {
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

        return parsedIntoModel;

    } catch (e: any) {
        console.error(e);
        return null;
    }
}