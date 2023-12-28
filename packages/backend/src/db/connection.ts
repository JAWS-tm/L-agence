// Setup db connection

import 'reflect-metadata';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'mariadb',
  host: process.env.DB_HOST ?? 'localhost',
  port: (process.env.DB_PORT ?? 3306) as number,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME ?? 'lagence',
  synchronize: process.env.NODE_ENV === 'production' ? false : true,
  logging: false,
  entities: ['src/models/*.ts'],
  migrationsTableName: 'migrations',
  migrations: ['migrations/*.ts'],
  subscribers: [],
});

export const initializeDatabase = async () => {
  try {
    const conn = await AppDataSource.initialize();

    console.log(
      `Database connection success. Database: '${conn.options.database}'`
    );
  } catch (err) {
    console.error('Database connection error: ', err);
  }
};

export default AppDataSource;
