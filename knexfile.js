// Update with your config settings.
const AWS_DBendpoint = 'sibtodo.csaqlecfbhrm.us-west-2.rds.amazonaws.com';

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: AWS_DBendpoint,
      port: '5432',
      user: 'sibtodo',   //master username as listed in the AWS Console,
      password: 'sibtodo123',
      database: 'sibtodo',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations_aws'
    }
  },
  production: {
    client: 'pg',
    connection: {
      host: AWS_DBendpoint,
      port: '5432',
      user: 'sibhat',   //master username as listed in the AWS Console,
      password: 'sibtodo123',
      database: 'sibtodo',
    },
    pool: {
      min: 1,
      max: 10,
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations_aws'
    }
  },
  testing: {
    client: 'pg',
    connection: {

      host: AWS_DBendpoint,
      port: '5432',
      user: 'sibhat',   //master username as listed in the AWS Console,
      password: 'sibtodo123',
      database: 'sibtodo',
    },
    pool: {
      min: 1,
      max: 10,
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations_aws'
    }
  },

};
