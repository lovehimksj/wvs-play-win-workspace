import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("speciality_code_master")
export class SpecialityCodeMaster {
  @PrimaryGeneratedColumn({ type: "int", name: "speciality_id" })
  specialityId: number;

  @Column("int", { name: "is_active", nullable: true })
  isActive: number | null;

  @Column("datetime", { name: "create_date", nullable: true })
  createDate: Date | null;

  @Column("varchar", { name: "speciality_code", nullable: true, length: 255 })
  specialityCode: string | null;

  @Column("varchar", {
    name: "speciality_code_type",
    nullable: true,
    length: 255
  })
  specialityCodeType: string | null;

  @Column("varchar", { name: "speciality_value", nullable: true, length: 255 })
  specialityValue: string | null;

  @Column("int", { name: "status", nullable: true })
  status: number | null;

  @Column("datetime", { name: "update_date", nullable: true })
  updateDate: Date | null;

  constructor(init?: Partial<SpecialityCodeMaster>) {
    Object.assign(this, init);
  }
}
