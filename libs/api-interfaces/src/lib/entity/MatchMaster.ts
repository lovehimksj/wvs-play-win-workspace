import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('match_master')
export default class MatchMaster {
  @PrimaryGeneratedColumn({ type: 'int', name: 'match_id' })
  matchId: number;

  @Column('int', { name: 'is_active', nullable: true })
  isActive: number | null;

  @Column('datetime', { name: 'create_date', nullable: true })
  createDate: Date | null;

  @Column('datetime', { name: 'match_date', nullable: true })
  matchDate: Date | null;

  @Column('varchar', { name: 'match_dese', nullable: true, length: 255 })
  matchDese: string | null;

  @Column('varchar', { name: 'match_name', nullable: true, length: 255 })
  matchName: string | null;

  @Column('varchar', { name: 'status', nullable: true, length: 255 })
  status: string | null;

  @Column('int', { name: 'team_one_id', nullable: true })
  teamOneId: number | null;

  @Column('int', { name: 'team_two_id', nullable: true })
  teamTwoId: number | null;

  @Column('datetime', { name: 'update_date', nullable: true })
  updateDate: Date | null;

  @Column('varchar', { name: 'venue', nullable: true, length: 255 })
  venue: string | null;

  constructor(init?: Partial<MatchMaster>) {
    Object.assign(this, init);
  }
}
