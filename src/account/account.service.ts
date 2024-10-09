import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  accountModel: any;
  create(createAccountDto: CreateAccountDto) {
    return 'This action adds a new account';
  }

  findAll() {
    return `This action returns all account`;
  }

  async findOne(id: number): Promise<Account> {
    const account = await this.accountModel.findByPk(id);
    if (!account) {
      throw new NotFoundException(`Compte avec l'ID ${id} non trouvé.`);
    }
    return account; // Assurez-vous que cela renvoie bien un Account
  }

  async getAccountsByUserId(userId: number): Promise<Account[]> {
    const accounts = await this.accountModel.findAll({
      where: { idUser: userId },
    });

    if (!accounts || accounts.length === 0) {
      throw new NotFoundException(`Aucun compte trouvé pour l'utilisateur avec l'ID ${userId}.`);
    }

    return accounts;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
