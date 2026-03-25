import mysql from 'mysql2/promise'
import bluebird from 'bluebird'

export default defineEventHandler(async (event) => {
    // Connexion à la base de données directement dans la fonction
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'nuxt_beers',
        Promise: bluebird,
    })
    
    try {
        // Exécution de la requête, et récupération des résultats
        const [rows] = await connection.execute(
            "SELECT * FROM favorite_beers ORDER BY favorite_date DESC"
        );
        return {
            favorites: rows
        };
    } finally {
        // Toujours refermer la connexion pour éviter les fuites de mémoire
        await connection.end();
    }
});