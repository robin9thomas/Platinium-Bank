/* eslint-disable prettier/prettier */
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
} from 'sequelize-typescript';

export enum AccountType {
    CURRENT = 'current',
    PRO = 'pro',
    TRANSFER = 'transfer',
    COMMON = 'common',
  }
@Table
export class Users extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column(DataType.NUMBER())
  idUser: number;

  @Column(DataType.DECIMAL())
  balance: string;

  @Column(DataType.ENUM(...Object.values(AccountType)))
  accountType: AccountType;
}
