export interface CreateDocumentDto {
  title: string;
  password: string;
  writerName: string;
  body: string;
  writerUid?: string;
  ip?: string;
}
