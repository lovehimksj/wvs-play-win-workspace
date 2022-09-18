import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('match_point_txn_detail')
export default class MatchPointTxnDetail {
  @PrimaryGeneratedColumn({ type: 'int', name: 'match_point_id' })
  matchPointId: number;

  @Column('int', { name: 'is_active', nullable: true })
  isActive: number | null;

  @Column('datetime', { name: 'create_date', nullable: true })
  createDate: Date | null;

  @Column('double', {
    name: 'cummulative_point',
    nullable: true,
    precision: 22,
  })
  cummulativePoint: number | null;

  @Column('int', { name: 'game_id', nullable: true })
  gameId: number | null;

  @Column('int', { name: 'match_id', nullable: true })
  matchId: number | null;

  @Column('int', { name: 'player_id', nullable: true })
  playerId: number | null;

  @Column('double', { name: 'point', nullable: true, precision: 22 })
  point: number | null;

  @Column('datetime', { name: 'update_date', nullable: true })
  updateDate: Date | null;

  @Column('varchar', { name: 'created_by', nullable: true, length: 255 })
  createdBy: string | null;

  @Column('varchar', { name: 'updated_by', nullable: true, length: 255 })
  updatedBy: string | null;

  constructor(init?: Partial<MatchPointTxnDetail>) {
    Object.assign(this, init);
  }
}
