import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './users.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 1. GET /users/:id
  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<IUser> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    return user;
  }

  // 2. POST /users
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return this.usersService.create(createUserDto);
  }

  // 3. PUT /users/:id
  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<IUser> {
    const user = await this.usersService.update(id, updateUserDto);
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    return user;
  }

  // 4. DELETE /users/:id
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const deleted = await this.usersService.delete(id);
    if (!deleted) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
  }

  // 5. GET /users/:id/accounts
//   @Get(':id/accounts')
//   async getUserAccounts(@Param('id', ParseIntPipe) id: number) {
//     const accounts = await this.usersService.getUserAccounts(id);
//     if (!accounts || accounts.length === 0) {
//       throw new NotFoundException('Aucun compte associé trouvé pour cet utilisateur');
//     }
//     return accounts;
//   }
}
