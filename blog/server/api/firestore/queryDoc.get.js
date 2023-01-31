import { getQuery } from "h3";
import { queryForDoc } from "~~/server/lib/firestore";

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event)
        const docs = await queryForDoc(query.col, query.id)
        return { query: docs }
    } catch (error) {
        return { error: error.message }
    }
})
