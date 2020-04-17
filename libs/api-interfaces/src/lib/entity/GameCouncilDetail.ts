import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("game_council_detail")
export class GameCouncilDetail {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "is_active", nullable: true })
  isActive: number | null;

  @Column("int", { name: "council_id", nullable: true })
  councilId: number | null;

  @Column("datetime", { name: "create_date", nullable: true })
  createDate: Date | null;

  @Column("int", { name: "game_id", nullable: true })
  gameId: number | null;

  @Column("datetime", { name: "update_date", nullable: true })
  updateDate: Date | null;

  constructor(init?: Partial<GameCouncilDetail>) {
    Object.assign(this, init);
  }
}
