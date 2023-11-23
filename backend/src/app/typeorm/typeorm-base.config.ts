import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const baseConfig: PostgresConnectionOptions = {
  type: 'postgres',
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  subscribers: [`${__dirname}/../**/*.subscriber{.ts,.js}`],
  synchronize: true,//false,
  migrationsRun: false,
  logger: 'file',
  migrations: [`${__dirname}/../../migrations/*{.ts,.js}`],
};

export default baseConfig;
