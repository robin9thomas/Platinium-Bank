export class CreateTransactionDto {
    transactionAmount: number;
    idRecipient?: number;
    idDonor: number;
    reason: string;
}
