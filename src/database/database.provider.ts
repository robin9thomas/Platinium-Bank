import { Sequelize } from 'sequelize-typescript';
import { Account } from 'src/account/entities/account.entity';
import { Cards } from 'src/cards/entities/card.entity';
import { Transactions } from 'src/transactions/entities/transaction.entity';
import { User } from 'src/users/users.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port:  3306,
        username: 'root',
        password: 'password',
        database: 'Platinium-Bank',
      });
      sequelize.addModels([User, Account, Cards, Transactions],);
      await sequelize.sync();
      return sequelize;
    },
  },
];
