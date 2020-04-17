import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("match_contest_detail")
export default class MatchContestDetail {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "is_active", nullable: true })
  isActive: number | null;

  @Column("int", { name: "contest_id", nullable: true })
  contestId: number | null;

  @Column("datetime", { name: "create_date", nullable: true })
  createDate: Date | null;

  @Column("int", { name: "match_id", nullable: true })
  matchId: number | null;

  constructor(init?: Partial<MatchContestDetail>) {
    Object.assign(this, init);
  }
}
