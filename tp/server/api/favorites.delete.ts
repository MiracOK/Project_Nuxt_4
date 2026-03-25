import mysql from 'mysql2/promise'
import bluebird from 'bluebird'

export default defineEventHandler(async (event) => {
    // Récupération de l'id
    const body = await readBody(event);
    const beerId = body?.beer_id;

    if (!beerId || String(beerId).trim() === '') {
        throw createError({
            statusCode: 400,
            statusMessage: "Le paramètre 'beer_id' est requis pour la suppression."
        });
    }

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'nuxt_beers',
        Promise: bluebird,
    })
    
    try {
        await connection.execute(
            "DELETE FROM favorite_beers WHERE beer_id = ?",
            [beerId]
        );
        
        return {
            success: true,
            message: "La bière a bien été retirée des favoris !"
        };
    } catch (error) {
        console.error("Erreur lors de la suppression en BDD:", error);
        throw createError({ statusCode: 500, statusMessage: "Erreur serveur" });
    } finally {
        await connection.end();
    }
});