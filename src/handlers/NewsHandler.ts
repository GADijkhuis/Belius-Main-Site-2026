import {fetchNewsItemsFromDatabase} from "./DatabaseHandler";

export const fetchNewsItems = async () => {

    const response = await fetchNewsItemsFromDatabase();

    if (!response) return { data: null, error: `Er konden geen nieuwsitems worden geladen.` };

    if (response.length === 0) return { data: null, error: `Geen nieuwsitems gevonden.` };

    return { data: response, error: null };
}