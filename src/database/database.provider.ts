import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/users/users.entity';
import { Card } from 'src/cards/entities/card.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { Account } from 'src/account/entities/account.entity';

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
      sequelize.addModels([User, Account, Card, Transaction]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
