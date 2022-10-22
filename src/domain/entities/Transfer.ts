import crypto from 'crypto';

export class Transfer {
  transferId: string;
  account_origin_id: string;
  account_destination_id: string;
  amount: number;
  created_at: Date;

  constructor({ account_origin_id, account_destination_id, amount }: input) {
    this.transferId = crypto.randomUUID();
    this.account_origin_id = account_origin_id;
    this.account_destination_id = account_destination_id;
    this.amount = amount;
    this.created_at = new Date();
  }
}

type input = {
  account_origin_id: string;
  account_destination_id: string;
  amount: number;
};
