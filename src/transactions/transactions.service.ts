import { Inject, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { Op } from 'sequelize';


@Injectable()
export class TransactionsService {
  constructor(
    @Inject(Transaction) private readonly transactionModel: typeof Transaction,
  ) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const transaction = await this.transactionModel.create({...createTransactionDto});
    return transaction;
  }

  async findLastTransactionsByUserId(userId: number): Promise<Transaction[]> {
    // Supposons que vous ayez accès à votre modèle de transaction
    return await Transaction.findAll({
      where: {
        [Op.or]: [
          { idDonor: userId },  // L'utilisateur est l'expéditeur
          { idRecipent: userId } // L'utilisateur est le destinataire
        ]
      },
      order: [['createdAt', 'DESC']], // Ordre décroissant par date
      limit: 10, // Limiter à 10 transactions
    });
  }


  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
