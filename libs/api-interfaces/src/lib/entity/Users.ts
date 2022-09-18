import { Column, Entity } from 'typeorm';

@Entity('users')
export default class Users {
  @Column('int', { name: 'id', nullable: true })
  id: number;

  @Column('varchar', { primary: true, name: 'user_id', length: 255 })
  userId: string;

  @Column('datetime', { name: 'create_date', nullable: true })
  createDate: Date | null;

  @Column('varchar', { name: 'email', nullable: true, length: 255 })
  email: string | null;

  @Column('varchar', { name: 'user_avatar', nullable: true, length: 255 })
  userAvatar: string | null;

  @Column('varchar', { name: 'first_name', nullable: true, length: 255 })
  firstName: string | null;

  @Column('varchar', { name: 'last_name', nullable: true, length: 255 })
  lastName: string | null;

  @Column('varchar', { name: 'mobile', nullable: true, length: 255 })
  mobile: string | null;

  @Column('varchar', { name: 'password', nullable: true, length: 255 })
  password: string | null;

  @Column('int', { name: 'role_id', nullable: true })
  roleId: number | null;

  @Column('varchar', { name: 'salt', nullable: true, length: 255 })
  salt: string | null;

  @Column('int', { name: 'status', nullable: true })
  status: number | null;

  @Column('datetime', { name: 'update_date', nullable: true })
  updateDate: Date | null;

  constructor(init?: Partial<Users>) {
    Object.assign(this, init);
  }
}
