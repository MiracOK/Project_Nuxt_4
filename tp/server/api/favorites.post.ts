import { getDbConnection } from '../utils/db'

export default defineEventHandler(async (event) => {
    // Récupération de l'id depuis le corps (body) de la requête
    const body = await readBody(event);
    const beerId = body?.beer_id;

    if (!beerId || String(beerId).trim() === '') {
        throw createError({
            statusCode: 400,
            statusMessage: "Le paramètre 'beer_id' est requis."
        });
    }

    const connection = await getDbConnection();
    
    try {
        // Insertion : si elle existe déjà on met juste à jour la date 
        await connection.execute(
            `INSERT INTO favorite_beers (beer_id, favorite_date) 
             VALUES (?, NOW()) 
             ON DUPLICATE KEY UPDATE favorite_date = NOW()`,
            [beerId]
        );
        
        return {
            success: true,
            message: "La bière a été ajoutée aux favoris !"
        };
    } catch (error) {
        console.error("Erreur lors de l'insertion en BDD:", error);
        throw createError({ statusCode: 500, statusMessage: "Erreur serveur" });
    } finally {
        await connection.end();
    }
});