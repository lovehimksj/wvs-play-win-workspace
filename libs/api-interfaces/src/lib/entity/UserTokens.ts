import { Column, Entity } from 'typeorm';

@Entity('user_tokens')
export default class UserTokens {
  @Column('varchar', { primary: true, name: 'token', length: 255 })
  token: string;

  @Column('int', { name: 'is_active', nullable: true })
  isActive: number | null;

  @Column('datetime', { name: 'create_date', nullable: true })
  createDate: Date | null;

  @Column('datetime', { name: 'expiration_date', nullable: true })
  expirationDate: Date | null;

  @Column('datetime', { name: 'login_date', nullable: true })
  loginDate: Date | null;

  @Column('varchar', { name: 'session_data', nullable: true, length: 255 })
  sessionData: string | null;

  @Column('datetime', { name: 'update_date', nullable: true })
  updateDate: Date | null;

  @Column('varchar', { name: 'user_id', nullable: true, length: 255 })
  userId: string | null;

  constructor(init?: Partial<UserTokens>) {
    Object.assign(this, init);
  }
}
