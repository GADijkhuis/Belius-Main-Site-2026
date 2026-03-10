import {createClient} from '@supabase/supabase-js';
import {NewsModel} from "../models/NewsModel";

export const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL || "",
    process.env.REACT_APP_SUPABASE_ANON_KEY || ""
);

export const fetchNewsItemsFromDatabase = async (amount: number | null = null) => {
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

        if (amount) {
            return parsedIntoModel.slice(0, amount);
        }

        return parsedIntoModel;

    } catch (e: any) {
        console.error(e);
        return null;
    }
}