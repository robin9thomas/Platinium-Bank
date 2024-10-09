/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './transactions/transactions.module';
import { CardsModule } from './cards/cards.module';
import { AccountModule } from './account/account.module';
import { DabModule } from './dab/dab.module';

@Module({
  imports: [DatabaseModule, UsersModule, AccountModule, CardsModule, TransactionsModule, AuthModule, DabModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
