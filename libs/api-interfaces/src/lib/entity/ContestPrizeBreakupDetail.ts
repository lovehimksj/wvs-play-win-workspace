import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contest_prize_breakup_detail')
export default class ContestPrizeBreakupDetail {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'is_active', nullable: true })
  isActive: number | null;

  @Column('int', { name: 'contest_id', nullable: true })
  contestId: number | null;

  @Column('datetime', { name: 'create_date', nullable: true })
  createDate: Date | null;

  @Column('varchar', { name: 'from_rank', nullable: true, length: 255 })
  fromRank: string | null;

  @Column('int', { name: 'match_id', nullable: true })
  matchId: number | null;

  @Column('double', { name: 'prize_money', nullable: true, precision: 22 })
  prizeMoney: number | null;

  @Column('varchar', { name: 'to_rank', nullable: true, length: 255 })
  toRank: string | null;

  constructor(init?: Partial<ContestPrizeBreakupDetail>) {
    Object.assign(this, init);
  }
}
