import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('player_master')
export class PlayerMaster {
  @PrimaryGeneratedColumn({ type: 'int', name: 'player_id' })
  playerId: number;

  @Column('int', { name: 'is_active', nullable: true })
  isActive: number | null;

  @Column('datetime', { name: 'create_date', nullable: true })
  createDate: Date | null;

  @Column('double', { name: 'credit_point', nullable: true, precision: 22 })
  creditPoint: number | null;

  @Column('double', { name: 'earn_point', nullable: true, precision: 22 })
  earnPoint: number | null;

  @Column('int', { name: 'game_id', nullable: true })
  gameId: number | null;

  @Column('varchar', { name: 'picture_file_name', nullable: true, length: 255 })
  pictureFileName: string | null;

  @Column('varchar', { name: 'player_dese', nullable: true, length: 255 })
  playerDese: string | null;

  @Column('varchar', { name: 'player_name', nullable: true, length: 255 })
  playerName: string | null;

  @Column('varchar', { name: 'playing_nation', nullable: true, length: 255 })
  playingNation: string | null;

  @Column('int', { name: 'speciality_id', nullable: true })
  specialityId: number | null;

  @Column('datetime', { name: 'update_date', nullable: true })
  updateDate: Date | null;

  constructor(init?: Partial<PlayerMaster>) {
    Object.assign(this, init);
  }
}
