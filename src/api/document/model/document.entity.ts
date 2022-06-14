import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import crypto from 'crypto';

export const PW_HASH_KEY = 'zCk8thC7FA'; // 환경변수로 빼거나 다른 데로 분리하거나?

@Entity({ name: 'document', orderBy: { documentId: 'ASC' } })
export class Document {
  @PrimaryGeneratedColumn('increment', {
    name: 'document_id',
    type: 'bigint',
  })
  documentId: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar', select: false })
  password: string;

  @Column({ type: 'varchar' })
  content: string;

  @Column({ name: 'writer_name', type: 'varchar' })
  writerName: string;

  @Column({ name: 'writer_uid', type: 'bigint' })
  writerUid: number;

  @Column({ name: 'comment_ids', type: 'varchar' })
  commentIds: string;

  @Column({ type: 'varchar' })
  ip: string;

  @Column({ default: false, type: 'boolean', select: false })
  deleted: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = crypto
      .createHmac('sha256', PW_HASH_KEY)
      .update(this.password)
      .digest('hex');
  }
}
