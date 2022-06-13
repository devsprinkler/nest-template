import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'document', orderBy: { documentId: 'ASC' } })
export class Document {
  @PrimaryGeneratedColumn('increment', {
    name: 'document_id',
    type: 'bigint',
  })
  documentId: number;

  @Column({ type: 'varchar' })
  title: string;

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
  createdAt: number;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: number;
}
