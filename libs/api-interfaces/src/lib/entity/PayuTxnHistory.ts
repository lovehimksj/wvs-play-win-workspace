import { Column, Entity } from "typeorm";

@Entity("payu_txn_history")
export default class PayuTxnHistory {
  @Column("varchar", { primary: true, name: "txn_id", length: 255 })
  txnId: string;

  @Column("int", { name: "contest_id", nullable: true })
  contestId: number | null;

  @Column("datetime", { name: "create_date", nullable: true })
  createDate: Date | null;

  @Column("varchar", { name: "payment_id", nullable: true, length: 255 })
  paymentId: string | null;

  @Column("double", {
    name: "transactin_ammount_inr",
    nullable: true,
    precision: 22
  })
  transactinAmmountInr: number | null;

  @Column("datetime", { name: "transaction_date", nullable: true })
  transactionDate: Date | null;

  @Column("varchar", {
    name: "transaction_status",
    nullable: true,
    length: 255
  })
  transactionStatus: string | null;

  @Column("varchar", { name: "txn_message", nullable: true, length: 255 })
  txnMessage: string | null;

  @Column("varchar", { name: "txn_status", nullable: true, length: 255 })
  txnStatus: string | null;

  @Column("datetime", { name: "update_date", nullable: true })
  updateDate: Date | null;

  @Column("varchar", { name: "user_id", nullable: true, length: 255 })
  userId: string | null;

  constructor(init?: Partial<PayuTxnHistory>) {
    Object.assign(this, init);
  }
}
