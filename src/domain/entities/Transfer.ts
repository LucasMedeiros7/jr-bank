export interface Transfer {
  transferId: string;
  account_origin_id: string;
  account_destination_id: string;
  amount: number;
  created_at: Date;
}
