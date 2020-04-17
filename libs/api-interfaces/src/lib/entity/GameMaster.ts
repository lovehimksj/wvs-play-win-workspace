import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("game_master")
export class GameMaster {
  @PrimaryGeneratedColumn({ type: "int", name: "game_id" })
  gameId: number;

  @Column("int", { name: "is_active", nullable: true })
  isActive: number | null;

  @Column("datetime", { name: "create_date", nullable: true })
  createDate: Date | null;

  @Column("varchar", { name: "game_dese", nullable: true, length: 255 })
  gameDese: string | null;

  @Column("varchar", { name: "game_name", nullable: true, length: 255 })
  gameName: string | null;

  @Column("datetime", { name: "update_date", nullable: true })
  updateDate: Date | null;

  constructor(init?: Partial<GameMaster>) {
    Object.assign(this, init);
  }
}
