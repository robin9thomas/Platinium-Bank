import { Injectable, Inject } from '@nestjs/common';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { Account } from '../accounts/account.model';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: typeof User,
  ) {}

  async findOne(id: number): Promise<User> {
    return this.userRepository.findByPk(id);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.create({...createUserDto});
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (!user) return null;
    return user.update(updateUserDto);
  }

  async delete(id: number): Promise<boolean> {
    const user = await this.findOne(id);
    if (!user) return false;
    await user.destroy();
    return true;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

//   async getUserAccounts(userId: number): Promise<Account[]> {
//     const user = await this.findOne(userId);
//     if (!user) return [];
//     return user.$get('accounts'); // Méthode Sequelize pour obtenir les comptes associés à un utilisateur
//   }
}
