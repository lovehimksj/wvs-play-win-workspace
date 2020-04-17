import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user_team_contest")
export default class UserTeamContest {
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

  @Column("double", {
    name: "total_earned_point",
    nullable: true,
    precision: 22
  })
  totalEarnedPoint: number | null;

  @Column("datetime", { name: "update_date", nullable: true })
  updateDate: Date | null;

  @Column("varchar", { name: "user_id", nullable: true, length: 255 })
  userId: string | null;

  @Column("varchar", { name: "user_team_id", nullable: true, length: 255 })
  userTeamId: string | null;

  constructor(init?: Partial<UserTeamContest>) {
    Object.assign(this, init);
  }
}
