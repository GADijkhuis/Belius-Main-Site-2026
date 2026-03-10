import {fetchNewsItemsFromDatabase} from "./DatabaseHandler";

export const fetchNewsItems = async (amount: number | null = null) => {

    const response = await fetchNewsItemsFromDatabase(amount);

    if (!response) return { data: null, error: `Er konden geen nieuwsitems worden geladen.` };

    if (response.length === 0) return { data: null, error: `Geen nieuwsitems gevonden.` };

    return { data: response, error: null };
}