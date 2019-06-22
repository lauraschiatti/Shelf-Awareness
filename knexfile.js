// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'root',
      database : 'shelfawareness'
    },
    migrations: {
        directory: __dirname + '/knex/migrations',
    },
    seeds: {
        directory: __dirname + '/knex/seeds'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
        directory: __dirname + '/knex/migrations',
    },
    seeds: {
        directory: __dirname + '/knex/seeds'
    }
  }

};
