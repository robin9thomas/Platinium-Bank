import { Sequelize } from 'sequelize-typescript';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 8889,
        username: 'root',
        password: 'password',
        database: 'Platinium-Bank',
      });
      await sequelize.sync();
      return sequelize;
    },
  },
];
