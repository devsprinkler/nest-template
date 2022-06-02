import { Body, Controller, Post } from '@nestjs/common';
import { CreateDocumentDto } from '@src/api/document/dto/create-document.dto';
import { DocumentCreateService } from '@src/api/document/service/document.create';

@Controller('/document')
export class DocumentController {
  constructor(private readonly documentCreateService: DocumentCreateService) {}

  @Post()
  public async createDocument(@Body() createDocumentDto: CreateDocumentDto) {
    this.documentCreateService.createDocument(createDocumentDto);
  }
}
