// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.AWS_DBendpoint,
      port: '5432',
      user: process.env.AWS_DBendpoint_User,   //master username as listed in the AWS Console,
      password:  process.env.AWS_DBendpoint_Password,
      database: process.env.AWS_DBendpoint_DB,
    },
    pool: {
      min: 1,
      max: 34,
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations_aws'
    }
  },
  production: {
    client: 'pg',
    connection: {
      host: process.env.AWS_DBendpoint,
      port: '5432',
      user: process.env.AWS_DBendpoint_User,   //master username as listed in the AWS Console,
      password:  process.env.AWS_DBendpoint_Password,
      database: process.env.AWS_DBendpoint_DB,
    },
    pool: {
      min: 1,
      max: 34,
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations_aws'
    }
  },
  testing: {
    client: 'pg',
    connection: {
      host: process.env.AWS_DBendpoint,
      port: '5432',
      user: process.env.AWS_DBendpoint_User,   //master username as listed in the AWS Console,
      password:  process.env.AWS_DBendpoint_Password,
      database: process.env.AWS_DBendpoint_DB,
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
