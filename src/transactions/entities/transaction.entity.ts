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
  export class Transaction extends Model {
    @PrimaryKey
    @Column
    id: number;

    @Column(DataType.DECIMAL(10, 2))
    transactionAmount: number;

    @Column({
      type: DataType.INTEGER,
      allowNull: true,
    })
    idRecipent: number;

    @Column({
      type: DataType.INTEGER,
      allowNull: true,
    })
    idDonor: number;

    @Column(DataType.STRING)
    reason: string;
  }
