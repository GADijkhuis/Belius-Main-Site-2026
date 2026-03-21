import {addNewsItemToDatabase, fetchNewsItemsFromDatabase, updateNewsItemInDatabase} from "./DatabaseHandler";
import {NewsModel} from "../models/NewsModel";

export const fetchNewsItems = async (amount: number | null = null) => {

    const response = await fetchNewsItemsFromDatabase(amount);

    if (!response) return { data: null, error: `Er konden geen nieuwsitems worden geladen.` };

    if (response.length === 0) return { data: null, error: `Geen nieuwsitems gevonden.` };

    return { data: response, error: null };
}

export const addNewsItem = async (newsItem: NewsModel) => {
    const newsItemToAdd: Partial<NewsModel> = {
        title: newsItem.title,
        description: newsItem.description,
        category: newsItem.category,
        date: newsItem.date,
        image_url: newsItem.image_url,
        link: newsItem.link,
    };

    const response = await addNewsItemToDatabase(newsItemToAdd);

    if (!response) return { data: null, error: `Er is een fout opgetreden bij het toevoegen van het nieuwsitem.` };

    return { data: response, error: null };
}

export const updateNewsItem = async (newsItem: NewsModel) => {
    const id = newsItem?.id;

    if (!id || id < 0) return { data: null, error: `Er is een fout opgetreden bij het toevoegen van het nieuwsitem.` };

    const newsItemToUpdate: Partial<NewsModel> = {
        title: newsItem.title,
        description: newsItem.description,
        category: newsItem.category,
        date: newsItem.date,
        image_url: newsItem.image_url,
        link: newsItem.link,
    };

    const response = await updateNewsItemInDatabase(id, newsItemToUpdate);

    if (!response) return { data: null, error: `Er is een fout opgetreden bij het toevoegen van het nieuwsitem.` };

    return { data: response, error: null };
}