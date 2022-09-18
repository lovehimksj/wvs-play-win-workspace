import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('team_tournament_detail')
export class TeamTournamentDetail {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'is_active', nullable: true })
  isActive: number | null;

  @Column('datetime', { name: 'create_date', nullable: true })
  createDate: Date | null;

  @Column('int', { name: 'team_id', nullable: true })
  teamId: number | null;

  @Column('int', { name: 'tournament_id', nullable: true })
  tournamentId: number | null;

  @Column('datetime', { name: 'update_date', nullable: true })
  updateDate: Date | null;

  constructor(init?: Partial<TeamTournamentDetail>) {
    Object.assign(this, init);
  }
}
