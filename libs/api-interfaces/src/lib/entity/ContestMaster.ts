import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("contest_master")
export default class ContestMaster {
  @PrimaryGeneratedColumn({ type: "int", name: "contest_id" })
  contestId: number;

  @Column("int", { name: "is_active", nullable: true })
  isActive: number | null;

  @Column("varchar", {
    name: "contest_description",
    nullable: true,
    length: 255
  })
  contestDescription: string | null;

  @Column("varchar", { name: "contest_name", nullable: true, length: 255 })
  contestName: string | null;

  @Column("datetime", { name: "create_date", nullable: true })
  createDate: Date | null;

  @Column("bigint", { name: "entry_fees", nullable: true })
  entryFees: string | null;

  @Column("varchar", { name: "icon_file_name", nullable: true, length: 255 })
  iconFileName: string | null;

  @Column("bigint", { name: "price_pool", nullable: true })
  pricePool: string | null;

  @Column("varchar", { name: "title", nullable: true, length: 255 })
  title: string | null;

  @Column("int", { name: "total_team", nullable: true })
  totalTeam: number | null;

  @Column("datetime", { name: "update_date", nullable: true })
  updateDate: Date | null;

  @Column("int", { name: "winners", nullable: true })
  winners: number | null;

  @Column("varchar", { name: "status", nullable: true, length: 255 })
  status: string | null;

  constructor(init?: Partial<ContestMaster>) {
    Object.assign(this, init);
  }
}
