module.exports = {
    development: //'Driver=pg;Server=127.0.0.1;Port=5432;Database=magrathea;Uid=postgres;Pwd=12345;'
    {
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            port: 5432,
            user: 'postgres',
            password: '12345',
            database: 'magrathea'
        },
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
