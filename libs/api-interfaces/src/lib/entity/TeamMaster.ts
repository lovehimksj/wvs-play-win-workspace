import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('team_master')
export class TeamMaster {
  @PrimaryGeneratedColumn({ type: 'int', name: 'team_id' })
  teamId: number;

  @Column('int', { name: 'is_active', nullable: true })
  isActive: number | null;

  @Column('datetime', { name: 'create_date', nullable: true })
  createDate: Date | null;

  @Column('varchar', { name: 'team_dese', nullable: true, length: 255 })
  teamDese: string | null;

  @Column('varchar', { name: 'team_icon', nullable: true, length: 255 })
  teamIcon: string | null;

  @Column('varchar', { name: 'team_name', nullable: true, length: 255 })
  teamName: string | null;

  @Column('datetime', { name: 'update_date', nullable: true })
  updateDate: Date | null;

  constructor(init?: Partial<TeamMaster>) {
    Object.assign(this, init);
  }
}
