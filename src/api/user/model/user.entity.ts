import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import crypto from 'crypto';

export const USER_HASH_KEY = 'lQEiYrI0yv'; // 환경변수로 빼거나 다른 데로 분리하거나?

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'uid',
    type: 'bigint',
  })
  uid: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', select: false })
  password: string;

  @Column({ type: 'varchar' })
  nickname: string;

  @Column({ type: 'varchar' })
  session: string;

  @Column({ default: false, type: 'boolean', select: false })
  deleted: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    if (!this.password) return;
    this.password = crypto
      .createHmac('sha256', USER_HASH_KEY)
      .update(this.password)
      .digest('hex');
  }
}
