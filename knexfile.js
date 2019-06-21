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
    connection: {
        host : 'ec2-79-125-4-72.eu-west-1.compute.amazonaws.com',
        port: '5432',
        user : 'mvqabcepsvczaw',
        password : '97bcdb34750cbb28d05cf00c505db2c64fb09cc8ae97d1117b3bf63986477f23',
        database : 'dbt6i2gv9m7jn'
    },
    migrations: {
        directory: __dirname + '/knex/migrations',
    },
    seeds: {
        directory: __dirname + '/knex/seeds'
    }
  }

};
