import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tournament_master")
export class TournamentMaster {
  @PrimaryGeneratedColumn({ type: "int", name: "tournament_id" })
  tournamentId: number;

  @Column("int", { name: "is_active", nullable: true })
  isActive: number | null;

  @Column("datetime", { name: "create_date", nullable: true })
  createDate: Date | null;

  @Column("varchar", { name: "tournament_dese", nullable: true, length: 255 })
  tournamentDese: string | null;

  @Column("varchar", { name: "tournament_name", nullable: true, length: 255 })
  tournamentName: string | null;

  @Column("datetime", { name: "update_date", nullable: true })
  updateDate: Date | null;

  @Column("varchar", { name: "year", nullable: true, length: 255 })
  year: string | null;

  constructor(init?: Partial<TournamentMaster>) {
    Object.assign(this, init);
  }
}
