import {
    addBlogCategoryToDatabase,
    addBlogItemToDatabase,
    addNewsItemToDatabase, deleteBlogCategoryFromDatabase, deleteBlogItemFromDatabase,
    deleteNewsItemFromDatabase, fetchBlogCategoriesFromDatabase, fetchBlogCategoryTitleByIdFromDatabase, fetchBlogItemsFromDatabase,
    fetchNewsItemsFromDatabase, updateBlogCategoryInDatabase, updateBlogItemInDatabase,
    updateNewsItemInDatabase
} from "./DatabaseHandler";
import {NewsModel} from "../models/NewsModel";
import {BlogModel} from "../models/BlogModel";
import {BlogCategoryModel} from "../models/BlogCategoryModel";

export const fetchBlogCategoryItems = async (amount: number | null = null) => {

    const response = await fetchBlogCategoriesFromDatabase(amount);

    if (!response) return { data: null, error: `Er konden geen items worden geladen.` };

    if (response.length === 0) return { data: null, error: `Geen items gevonden.` };

    return { data: response, error: null };
}

export const fetchBlogCategoryTitleById = async (id: number) => {
    const response = await fetchBlogCategoryTitleByIdFromDatabase(id);

    if (!response) return { data: null, error: `Er kon geen categorie worden geladen.` };

    return { data: response, error: null };
}


export const addBlogCategoryItem = async (blogItem: BlogCategoryModel) => {
    const blogItemToAdd: Partial<BlogCategoryModel> = {
        name: blogItem.name,
        image_url: blogItem.image_url,
    };

    const response = await addBlogCategoryToDatabase(blogItemToAdd);

    if (!response) return { data: null, error: `Er is een fout opgetreden bij het toevoegen van het item.` };

    return { data: response, error: null };
}

export const updateBlogCategoryItem = async (blogItem: BlogCategoryModel) => {
    const id = blogItem?.id;

    if (!id || id < 0) return { data: null, error: `Er is een fout opgetreden bij het toevoegen van het item.` };

    const blogItemToUpdate: Partial<BlogCategoryModel> = {
        name: blogItem.name,
        image_url: blogItem.image_url,
    };

    const response = await updateBlogCategoryInDatabase(id, blogItemToUpdate);

    if (!response) return { data: null, error: `Er is een fout opgetreden bij het toevoegen van het item.` };

    return { data: response, error: null };
}

export const deleteBlogCategoryItem = async (blogItem: BlogCategoryModel) => {
    const id = blogItem?.id;

    if (!id || id < 0) return { data: null, error: `Er is een fout opgetreden bij het verwijderen van het item.` };

    const response = await deleteBlogCategoryFromDatabase(id);

    if (!response) return { data: null, error: `Er is een fout opgetreden bij het verwijderen van het item.` };

    return { data: response, error: null };
}

export const fetchBlogItems = async (categoryId: number) => {

    const response = await fetchBlogItemsFromDatabase(categoryId);

    if (!response) return { data: null, error: `Er konden geen items worden geladen.` };

    if (response.length === 0) return { data: null, error: `Geen items gevonden.` };

    return { data: response, error: null };
}

export const addBlogItem = async (blogItem: BlogModel, categoryId: number) => {
    const blogItemToAdd: Partial<BlogModel> = {
        title: blogItem.title,
        description: blogItem.description,
        category: blogItem.category,
        date: blogItem.date,
        image_url: blogItem.image_url,
        link: blogItem.link,
        category_id: categoryId
    };

    const response = await addBlogItemToDatabase(blogItemToAdd);

    if (!response) return { data: null, error: `Er is een fout opgetreden bij het toevoegen van het item.` };

    return { data: response, error: null };
}

export const updateBlogItem = async (blogItem: BlogModel, categoryId: number) => {
    const id = blogItem?.id;

    if (!id || id < 0) return { data: null, error: `Er is een fout opgetreden bij het toevoegen van het item.` };

    const blogItemToUpdate: Partial<BlogModel> = {
        title: blogItem.title,
        description: blogItem.description,
        category: blogItem.category,
        date: blogItem.date,
        image_url: blogItem.image_url,
        link: blogItem.link,
        category_id: categoryId
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