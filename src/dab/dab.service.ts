import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { TransactionsService } from '../transactions/transactions.service'; // Service de gestion des transactions
import { Account } from 'src/account/entities/account.entity';
import { AccountService } from 'src/account/account.service';
import { Transaction } from 'src/transactions/entities/transaction.entity';

@Injectable()
export class DabService {
  cardsService: any;
    currentUserId: any;
  constructor(
    private readonly accountsService: AccountService,
    private readonly transactionsService: TransactionsService,
  ) {}

  async login(cardNumber: string, pinCode: number): Promise<any> {
    const card = await this.cardsService.findByCardNumber(cardNumber);

    if (!card || card.pinCode !== pinCode) {
      throw new UnauthorizedException('Carte ou code PIN incorrect.');
    }

    this.currentUserId = card.idAccount;
    return { message: 'Identifié avec succès.' };
  }

  // Consultation des soldes
  async getBalances(userId: number): Promise<Account[]> {
    return await this.accountsService.getAccountsByUserId(userId);
  }

  // Retrait d'argent
  async withdraw(accountId: number, amount: number): Promise<Transaction> {
    const account = await this.accountsService.findOne(accountId);

    // Vérifiez si le solde est suffisant
    if (account.balance < amount) {
      throw new Error('Solde insuffisant');
    }

    // Créez une nouvelle transaction de retrait
    const transaction = await this.transactionsService.create({
      transactionAmount: amount,
      idDonor: accountId,
      reason: "Retrait d'argent",
    });

    // Mettez à jour le solde
    account.balance -= amount;
    await account.save();

    return transaction;
  }

  // Virement interne
  async transfer(
    fromAccountId: number,
    toAccountId: number,
    amount: number,
  ): Promise<Transaction> {
    const fromAccount = await this.accountsService.findOne(fromAccountId);
    const toAccount = await this.accountsService.findOne(toAccountId);

    // Vérifiez si le solde est suffisant
    if (fromAccount.balance < amount) {
      throw new Error('Solde insuffisant pour le virement');
    }

    // Créez une nouvelle transaction de virement
    const transaction = await this.transactionsService.create({
      transactionAmount: amount,
      idDonor: fromAccountId,
      idRecipient: toAccountId,
      reason: 'Virement interne',
    });

    // Mettez à jour les soldes
    fromAccount.balance -= amount;
    toAccount.balance += amount;
    await fromAccount.save();
    await toAccount.save();

    return transaction;
  }

  // Dépôt de chèque
  async depositCheck(accountId: number, amount: number): Promise<Transaction> {
    const account = await this.accountsService.findOne(accountId);

    // Créez une nouvelle transaction de dépôt de chèque
    const transaction = await this.transactionsService.create({
      transactionAmount: amount,
      idDonor: accountId,
      reason: 'Dépôt de chèque',
    });

    // Ajoutez le montant au solde (peut être en attente de validation)
    account.balance += amount; // Vous pouvez changer cela selon votre logique de dépôt de chèque
    await account.save();

    return transaction;
  }


  async getLastTransactions(userId: number): Promise<Transaction[]> {
    // Utiliser le service des transactions pour récupérer les transactions
    const transactions = await this.transactionsService.findLastTransactionsByUserId(userId);
    
    if (!transactions || transactions.length === 0) {
      throw new NotFoundException('Aucune transaction trouvée pour cet utilisateur.');
    }

    return transactions;
  }
}
