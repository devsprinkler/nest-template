import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'document', orderBy: { documentIndex: 'ASC' } })
export class Document {
  @PrimaryGeneratedColumn('increment', { name: 'document_index' })
  documentIndex: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  body: string;

  @Column({ name: 'wirter_name', type: 'varchar' })
  writerName: string;

  @Column({ name: 'writer_uid', type: 'long' })
  writerUid: number;

  @Column({ type: 'varchar' })
  comments: string; // TODO: set foreign key

  @Column({ type: 'varchar' })
  ip: string;

  @Column({ default: false, type: 'boolean', select: false })
  deleted: boolean;

  @CreateDateColumn({ name: 'craeted_at', type: 'long' })
  createdAt: number;

  @UpdateDateColumn({ name: 'updated_at', type: 'long' })
  updatedAt: number;
}
