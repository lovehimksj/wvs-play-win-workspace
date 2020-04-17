import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("game_match_detail")
export default class GameMatchDetail {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "is_active", nullable: true })
  isActive: number | null;

  @Column("datetime", { name: "create_date", nullable: true })
  createDate: Date | null;

  @Column("int", { name: "game_id", nullable: true })
  gameId: number | null;

  @Column("int", { name: "match_id", nullable: true })
  matchId: number | null;

  constructor(init?: Partial<GameMatchDetail>) {
    Object.assign(this, init);
  }
}
