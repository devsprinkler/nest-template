import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateDocumentDto } from '@src/api/document/dto/create-document.dto';
import { DocumentCreateService } from '@src/api/document/service/document.create';
import { DocumentReadService } from '@src/api/document/service/document.read';
import { UpdateDocumentDto } from '@src/api/document/dto/update-document.dto';
import { DocumentUpdateService } from '@src/api/document/service/document.update';

@Controller('/document')
export class DocumentController {
  constructor(
    private readonly documentCreateService: DocumentCreateService,
    private readonly documentReadService: DocumentReadService,
    private readonly documentUpdateService: DocumentUpdateService,
  ) {}

  @Post()
  public async createDocument(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentCreateService.createDocument(createDocumentDto);
  }

  @Get('/list')
  public async listDocument(@Query() page: number) {
    return this.documentReadService.listDocument(page);
  }

  @Get(':documentIndex')
  public async readDocument(@Param() documentIndex: number) {
    return this.documentReadService.singleDocument(documentIndex);
  }

  @Put(':documentIndex')
  public async updateDocument(@Body() updateDocumentDto: UpdateDocumentDto) {
    return this.documentUpdateService.updateDocument(updateDocumentDto);
  }
}
