const env = { ...require('./utils/env').parseDotEnv(), ...process.env };


/**
 * @see https://orkhan.gitbook.io/typeorm/docs/using-ormconfig#using-environment-variables
 * @type TypeOrmModuleOptions
 */
let config = {
  type: env.TYPEORM_CONNECTION,
  host: env.TYPEORM_HOST,
  port: +env.TYPEORM_PORT,
  username: env.TYPEORM_USERNAME,
  password: env.TYPEORM_PASSWORD,
  database: env.TYPEORM_DATABASE,
  server: env.TYPEORM_HOST,
  options: {
    encrypt: false,
    enableArithAbort: false,
  },
  cache: true,
  maxQueryExecutionTime: env.TYPEORM_MAX_QUERY_EXECUTION_TIME,
  debug: env.TYPEORM_DEBUG ?? false,
  logging: env.TYPEORM_LOGGING ?? true,
  migrationsRun: env.TYPEORM_MIGRATIONS_RUN ?? false,
  synchronize: false, // never use synchronize
  entities: ['./dist/database/entities/*.entity{.ts,.js}'],
  migrations: ['./dist/database/migrations/*{.ts,.js}'],
  cli: {
    entitiesDir: './src/database/entities',
    migrationsDir: './src/database/migrations',
  },
};

module.exports = config;
