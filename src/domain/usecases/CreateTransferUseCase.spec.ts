// import { Transfer } from '../entities/Transfer';
// import { ITransferRepository } from '../repositories/ITransferRepository';

// class DebitAccountUseCase {
//   async execute(account_id: string, amount: number): Promise<void> {
//     // "Invalid account detination id"
//     // implementa o repo direto nele
//     // pega no repository pelo balance => account id find()
//     // nao aceitar float de alguma forma para nao atrapalhar a conta
//     // newbalance = balance - amount
//     // update no banco => prisma.account.update(id, newbalance)
//   }
// }

// class CreditAccountUseCase {
//   async execute(account_id: string, amount: number): Promise<void> {
//     // implementa o repo direto nele
//     // pega no repository pelo balance => account id find()
//     // nao aceitar float de alguma forma para nao atrapalhar a conta
//     // newbalance = balance + amount
//     // update no banco => prisma.account.update(id, newbalance)
//   }
// }

// class CreateTransferUseCase {
//   constructor(
//     private transferRepository: ITransferRepository,
//     private debitAccountUseCase: DebitAccountUseCase,
//     private creditAccountUseCase: CreditAccountUseCase
//   ) {}

//   async execute({
//     account_origin_id,
//     account_destination_id,
//     amount
//   }: input): Promise<void> {
//     try {
//       await this.debitAccountUseCase.execute(account_origin_id, amount);
//       await this.creditAccountUseCase.execute(account_destination_id, amount);
//     } catch (err) {
//       throw new Error(err.message);
//     }

//     await this.transferRepository
//       .save({
//         account_origin_id,
//         account_destination_id,
//         amount
//       })
//       .catch((err) => console.log(err));
//   }
// }
// type input = {
//   account_origin_id: string;
//   account_destination_id: string;
//   amount: number;
// };

// class InMemoryTransferRepository implements ITransferRepository {
//   transfers: Transfer[];

//   constructor() {
//     this.transfers = [];
//   }

//   async save({
//     account_origin_id,
//     account_destination_id,
//     amount
//   }: input): Promise<void> {
//     const transfer = {
//       transferId: 'faketransfer123456',
//       account_origin_id,
//       account_destination_id,
//       amount,
//       created_at: new Date()
//     };

//     this.transfers.push(transfer);
//   }

//   async listAll(): Promise<Transfer[]> {
//     return this.transfers;
//   }
// }

// describe('Create transfer use case', () => {
//   it('should create an transfer', async () => {
//     const transferRepository = new InMemoryTransferRepository();
//     // const createTransferUseCase = new CreateTransferUseCase(transferRepository);

//     // createTransferUseCase.execute({
//     //   account_origin_id: 'any_id_Ori',
//     //   account_destination_id: 'any_id_Dest',
//     //   amount: 50
//     // });

//     expect(await transferRepository.listAll()).toHaveLength(1);
//   });
// });
