/* eslint-disable prettier/prettier */
import {
    Table,
    Column,
    Model,
    PrimaryKey,
    DataType,
  } from 'sequelize-typescript';
  
  export enum TransactionType {
    DEPOSIT = 'deposit',
    WITHDRAWAL = 'withdrawal',
    TRANSFER = 'transfer',
    CHECK_DEPOSIT = 'check_deposit',
  }

  @Table
  export class Users extends Model {
    @PrimaryKey
    @Column
    id: number;

    @Column(DataType.DECIMAL())
    transactionAmount: string;
  
    @Column({
        type: DataType.NUMBER(),
        allowNull: true,}
    )
    idRecipent: number;
  
    @Column({
        type: DataType.NUMBER(),
        allowNull: true,}
    )
    idDonor: number;
  
    @Column({
        type : DataType.STRING(255),
        allowNull : true,
    })
    reason: string;
  }
  