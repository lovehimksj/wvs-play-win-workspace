import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("wallet")
export class Wallet {
  @PrimaryGeneratedColumn({ type: "int", name: "wallet_id" })
  walletId: number;

  @Column("int", { name: "is_active", nullable: true })
  isActive: number | null;

  @Column("double", { name: "amt_inr", nullable: true, precision: 22 })
  amtInr: number | null;

  @Column("datetime", { name: "create_date", nullable: true })
  createDate: Date | null;

  @Column("double", { name: "initial_amount", nullable: true, precision: 22 })
  initialAmount: number | null;

  @Column("datetime", { name: "update_date", nullable: true })
  updateDate: Date | null;

  @Column("varchar", { name: "user_id", nullable: true, length: 255 })
  userId: string | null;

  constructor(init?: Partial<Wallet>) {
    Object.assign(this, init);
  }
}
