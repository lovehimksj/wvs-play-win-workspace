import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transaction_history')
export default class TransactionHistory {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'is_active', nullable: true })
  isActive: number | null;

  @Column('int', { name: 'contest_id', nullable: true })
  contestId: number | null;

  @Column('datetime', { name: 'create_date', nullable: true })
  createDate: Date | null;

  @Column('double', {
    name: 'transactin_ammount_inr',
    nullable: true,
    precision: 22,
  })
  transactinAmmountInr: number | null;

  @Column('datetime', { name: 'transaction_date', nullable: true })
  transactionDate: Date | null;

  @Column('varchar', { name: 'transaction_mode', nullable: true, length: 255 })
  transactionMode: string | null;

  @Column('varchar', {
    name: 'transaction_status',
    nullable: true,
    length: 255,
  })
  transactionStatus: string | null;

  @Column('varchar', { name: 'transaction_type', nullable: true, length: 255 })
  transactionType: string | null;

  @Column('varchar', { name: 'txn_id', nullable: true, length: 255 })
  txnId: string | null;

  @Column('varchar', { name: 'user_id', nullable: true, length: 255 })
  userId: string | null;

  constructor(init?: Partial<TransactionHistory>) {
    Object.assign(this, init);
  }
}
