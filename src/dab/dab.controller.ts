import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { DabService } from './dab.service'; 
import { Account } from 'src/account/entities/account.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';

@Controller('dab')
export class DabController {
  constructor(private readonly dabService: DabService) {}

  // Identification de l'utilisateur
  @Post('login')
  async login(@Body() body: { cardNumber: string; pinCode: number }): Promise<any> {
    return this.dabService.login(body.cardNumber, body.pinCode);
  }

  // Consultation des soldes
//   @Get('balances')
//   async getBalances(): Promise<Account[]> {
//     return this.dabService.getBalances();
//   }

  // Consultation des 10 dernières opérations
  @Get('transactions/:userId')
  async getLastTransactions(@Param('userId') userId: number): Promise<Transaction[]> {
    return this.dabService.getLastTransactions(userId);
  }

  // Retrait d'argent
  @Post('withdraw')
  async withdraw(@Body() body: { accountId: number; amount: number }): Promise<Transaction> {
    return this.dabService.withdraw(body.accountId, body.amount);
  }

  // Virement interne
  @Post('transfer')
  async transfer(@Body() body: { fromAccountId: number; toAccountId: number; amount: number }): Promise<Transaction> {
    return this.dabService.transfer(body.fromAccountId, body.toAccountId, body.amount);
  }

  // Dépôt de chèque
  @Post('deposit')
  async depositCheck(@Body() body: { accountId: number; amount: number }): Promise<Transaction> {
    return this.dabService.depositCheck(body.accountId, body.amount);
  }

  // Déconnexion de l'utilisateur
//   @Post('logout')
//   logout(): void {
//     this.dabService.logout();
//   }
}
