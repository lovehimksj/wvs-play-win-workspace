import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export default class Roles {
  @PrimaryGeneratedColumn({ type: 'int', name: 'role_id' })
  roleId: number;

  @Column('int', { name: 'is_active', nullable: true })
  isActive: number | null;

  @Column('datetime', { name: 'create_date', nullable: true })
  createDate: Date | null;

  @Column('varchar', { name: 'description', nullable: true, length: 255 })
  description: string | null;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('datetime', { name: 'update_date', nullable: true })
  updateDate: Date | null;

  constructor(init?: Partial<Roles>) {
    Object.assign(this, init);
  }
}
