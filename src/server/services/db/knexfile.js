module.exports = {
    development: {
        client: 'pg',
        connection: 'postgres://localhost/magrathea',
        migrations: {
            directory: './migrations/'
        },
        seeds: {
            directory: './seeds'
        }
    },

    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: './src/server/services/db/migrations'
        },
        seeds: {
            directory: './src/server/services/db/seeds'
        }
    }
};
