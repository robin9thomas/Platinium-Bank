/* eslint-disable prettier/prettier */
import {
    Table,
    Column,
    Model,
    PrimaryKey,
    DataType,
} from 'sequelize-typescript';

@Table
export class Card extends Model {
    @PrimaryKey
    @Column
    id: number;

    @Column(DataType.INTEGER)
    idAccount: number;

    @Column(DataType.STRING)
    cardNumber: string;

    @Column(DataType.INTEGER)
    ccv: number;

    @Column(DataType.INTEGER)
    pinCode: number;

    @Column(DataType.STRING)
    expirationDate: string;
}