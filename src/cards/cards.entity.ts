/* eslint-disable prettier/prettier */
import {
    Table,
    Column,
    Model,
    PrimaryKey,
    DataType,
  } from 'sequelize-typescript';

  

  @Table
  export class Users extends Model {
    @PrimaryKey
    @Column
    id: number;
  
    @Column(DataType.NUMBER())
    idAccount: number;
  
    @Column(DataType.NUMBER())
    cardNumber: string;
  
    @Column(DataType.NUMBER())
    ccv: number;

    @Column(DataType.NUMBER())
    pinCode: number;

    @Column(DataType.STRING)
    expirationDate: string;
  }
  