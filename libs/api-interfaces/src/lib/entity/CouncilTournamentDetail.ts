import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("council_tournament_detail")
export class CouncilTournamentDetail {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "is_active", nullable: true })
  isActive: number | null;

  @Column("int", { name: "council_id", nullable: true })
  councilId: number | null;

  @Column("datetime", { name: "create_date", nullable: true })
  createDate: Date | null;

  @Column("int", { name: "tournament_id", nullable: true })
  tournamentId: number | null;

  @Column("datetime", { name: "update_date", nullable: true })
  updateDate: Date | null;

  constructor(init?: Partial<CouncilTournamentDetail>) {
    Object.assign(this, init);
  }
}
