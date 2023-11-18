import { DataSource } from 'typeorm';

import baseConfig from './typeorm-base.config';


const defaultDataSource = new DataSource({
  ...baseConfig,
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT as unknown as number || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'vysota_charity_db',
logger: 'advanced-console',
});

export default defaultDataSource;
