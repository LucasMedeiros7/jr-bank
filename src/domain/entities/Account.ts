import crypto from 'crypto';

export class Account {
  account_id: string;
  name: string;
  password: string;
  cpf: string;
  balance: number;
  created_at: Date;

  constructor({ name, password, cpf }: input) {
    this.account_id = crypto.randomUUID();
    this.name = name;
    this.password = password;
    this.cpf = cpf;
    this.balance = 50000;
    this.created_at = new Date();
  }
}

type input = {
  cpf: string;
  name: string;
  password: string;
};
