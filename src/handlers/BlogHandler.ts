import {
    addBlogItemToDatabase,
    addNewsItemToDatabase, deleteBlogItemFromDatabase,
    deleteNewsItemFromDatabase, fetchBlogItemsFromDatabase,
    fetchNewsItemsFromDatabase, updateBlogItemInDatabase,
    updateNewsItemInDatabase
} from "./DatabaseHandler";
import {NewsModel} from "../models/NewsModel";
import {BlogModel} from "../models/BlogModel";

export const fetchBlogItems = async () => {

    const response = await fetchBlogItemsFromDatabase();

    if (!response) return { data: null, error: `Er konden geen items worden geladen.` };

    if (response.length === 0) return { data: null, error: `Geen items gevonden.` };

    return { data: response, error: null };
}

export const addBlogItem = async (blogItem: BlogModel) => {
    const blogItemToAdd: Partial<BlogModel> = {
        title: blogItem.title,
        description: blogItem.description,
        category: blogItem.category,
        date: blogItem.date,
        image_url: blogItem.image_url,
        link: blogItem.link,
    };

    const response = await addBlogItemToDatabase(blogItemToAdd);

    if (!response) return { data: null, error: `Er is een fout opgetreden bij het toevoegen van het item.` };

    return { data: response, error: null };
}

export const updateBlogItem = async (blogItem: BlogModel) => {
    const id = blogItem?.id;

    if (!id || id < 0) return { data: null, error: `Er is een fout opgetreden bij het toevoegen van het item.` };

    const blogItemToUpdate: Partial<BlogModel> = {
        title: blogItem.title,
        description: blogItem.description,
        category: blogItem.category,
        date: blogItem.date,
        image_url: blogItem.image_url,
        link: blogItem.link,
    };

    const response = await updateBlogItemInDatabase(id, blogItemToUpdate);

    if (!response) return { data: null, error: `Er is een fout opgetreden bij het toevoegen van het item.` };

    return { data: response, error: null };
}

export const deleteBlogItem = async (blogItem: BlogModel) => {
    const id = blogItem?.id;

    if (!id || id < 0) return { data: null, error: `Er is een fout opgetreden bij het verwijderen van het item.` };

    const response = await deleteBlogItemFromDatabase(id);

    if (!response) return { data: null, error: `Er is een fout opgetreden bij het verwijderen van het item.` };

    return { data: response, error: null };
}