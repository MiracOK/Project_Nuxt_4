import { getDbConnection } from '../utils/db'

export default defineEventHandler(async (event) => {
    // Connexion à la base de données
    const connection = await getDbConnection();
    
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