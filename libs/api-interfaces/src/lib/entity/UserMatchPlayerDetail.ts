import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_match_player_detail')
export default class UserMatchPlayerDetail {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('int', { name: 'is_active', nullable: true })
  isActive: number | null;

  @Column('datetime', { name: 'create_date', nullable: true })
  createDate: Date | null;

  @Column('int', { name: 'is_capton', nullable: true })
  isCapton: number | null;

  @Column('int', { name: 'is_vicecapton', nullable: true })
  isVicecapton: number | null;

  @Column('int', { name: 'match_id', nullable: true })
  matchId: number | null;

  @Column('int', { name: 'player_id', nullable: true })
  playerId: number | null;

  @Column('datetime', { name: 'update_date', nullable: true })
  updateDate: Date | null;

  @Column('varchar', { name: 'user_id', nullable: true, length: 255 })
  userId: string | null;

  @Column('varchar', { name: 'user_team_id', nullable: true, length: 255 })
  userTeamId: string | null;

  @Column('double', { name: 'point', nullable: true, precision: 22 })
  point: number | null;

  constructor(init?: Partial<UserMatchPlayerDetail>) {
    Object.assign(this, init);
  }
}
