import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_team_limit')
export default class UserTeamLimit {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'is_active', nullable: true })
  isActive: number | null;

  @Column('datetime', { name: 'create_date', nullable: true })
  createDate: Date | null;

  @Column('int', { name: 'team_limit', nullable: true })
  teamLimit: number | null;

  @Column('int', { name: 'match_id', nullable: true })
  matchId: number | null;

  @Column('datetime', { name: 'update_date', nullable: true })
  updateDate: Date | null;

  @Column('varchar', { name: 'user_id', nullable: true, length: 255 })
  userId: string | null;

  constructor(init?: Partial<UserTeamLimit>) {
    Object.assign(this, init);
  }
}
