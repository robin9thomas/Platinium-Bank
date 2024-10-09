import { Module } from '@nestjs/common';
import { DabService } from './dab.service';
import { DabController } from './dab.controller';
import { TransactionsModule } from '../transactions/transactions.module'; // Assurez-vous d'importer le module des transactions
import { DatabaseModule } from 'src/database/database.module';
import { AccountModule } from 'src/account/account.module';


@Module({
  imports: [DatabaseModule, AccountModule, TransactionsModule],
  controllers: [DabController],
  providers: [DabService],
})
export class DabModule {}
