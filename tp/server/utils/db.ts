import mysql from 'mysql2/promise'
import bluebird from 'bluebird'

/**
 * Fonction utilitaire pour éviter de répéter le bloc de connexion
 * dans chaque route de notre API.
 * Tu pourras adapter les identifiants MySQL (user / password) si besoin.
 */
export const getDbConnection = async () => {
    return await mysql.createConnection({
        host: 'localhost', // Depuis la machine, c'est localhost (via port 3306 exposé)
        user: 'root',
        password: 'root', // Le mot de passe indiqué dans notre docker-compose
        database: 'nuxt_beers', // Le nom initialisé par docker-compose
        Promise: bluebird,
    })
}