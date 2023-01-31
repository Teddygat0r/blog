import { getQuery } from "h3";
import { queryByCollection } from "~~/server/lib/firestore";

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);
        
        const docs = await queryByCollection(query.col)
        return { query: docs };
    } catch (error) {
        return { error: error.message };
    }
});
