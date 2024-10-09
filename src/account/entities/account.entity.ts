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
  export class Account extends Model {
    @PrimaryKey
    @Column
    id: number;
  
    @Column(DataType.INTEGER)
    idUser: number;
  
    @Column(DataType.DECIMAL(10, 2))
    balance: number;
  
    @Column(DataType.ENUM(...Object.values(AccountType)))
    accountType: AccountType;
  }