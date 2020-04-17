import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("council_master")
export class CouncilMaster {
  @PrimaryGeneratedColumn({ type: "int", name: "council_id" })
  councilId: number;

  @Column("int", { name: "is_active", nullable: true })
  isActive: number | null;

  @Column("varchar", { name: "council_dese", nullable: true, length: 255 })
  councilDese: string | null;

  @Column("varchar", { name: "council_name", nullable: true, length: 255 })
  councilName: string | null;

  @Column("datetime", { name: "create_date", nullable: true })
  createDate: Date | null;

  @Column("datetime", { name: "update_date", nullable: true })
  updateDate: Date | null;

  constructor(init?: Partial<CouncilMaster>) {
    Object.assign(this, init);
  }
}
