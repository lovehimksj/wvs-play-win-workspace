import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('match_tournament_detail')
export default class MatchTournamentDetail {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'is_active', nullable: true })
  isActive: number | null;

  @Column('datetime', { name: 'create_date', nullable: true })
  createDate: Date | null;

  @Column('int', { name: 'match_id', nullable: true })
  matchId: number | null;

  @Column('int', { name: 'tournament_id', nullable: true })
  tournamentId: number | null;

  @Column('datetime', { name: 'update_date', nullable: true })
  updateDate: Date | null;

  constructor(init?: Partial<MatchTournamentDetail>) {
    Object.assign(this, init);
  }
}
