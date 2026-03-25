import mysql from 'mysql2/promise'
import bluebird from 'bluebird'

/**
 * Fonction utilitaire pour éviter de répéter le bloc de connexion
 * dans chaque route de notre API.
 * Tu pourras adapter les identifiants MySQL (user / password) si besoin.
 */
export const getDbConnection = async () => {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '', // Modifie si ton mdp par défaut n'est pas vide (ex: 'root')
        database: 'nuxt_beers', // Nom de notre base
        Promise: bluebird,
    })
}