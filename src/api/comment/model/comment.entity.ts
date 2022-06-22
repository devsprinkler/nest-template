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

export const COMMENT_HASH_KEY = '47eYIQAo0p';

@Entity({ name: 'comment', orderBy: { commentId: 'DESC' } })
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'comment_id',
    type: 'bigint',
  })
  commentId: number;

  @Column({ name: 'document_id', type: 'bigint' })
  documentId: number;

  @Column({ type: 'varchar', select: false })
  password: string;

  @Column({ name: 'writer_name', type: 'varchar' })
  writerName: string;

  @Column({ name: 'writer_uid', type: 'bigint' })
  writerUid: number;

  @Column({ type: 'varchar' })
  ip: string;

  @Column({ type: 'varchar' })
  content: string;

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
      .createHmac('sha256', COMMENT_HASH_KEY)
      .update(this.password)
      .digest('hex');
  }
}
