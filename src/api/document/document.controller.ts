import { Body, Controller, Get, Patch, Post, Query, Ip } from '@nestjs/common';
import { CreateDocumentBody } from '@src/api/document/dto/create-document.dto';
import { DocumentCreateService } from '@src/api/document/service/document.create';
import { DocumentReadService } from '@src/api/document/service/document.read';
import { UpdateDocumentBody } from '@src/api/document/dto/update-document.dto';
import { DocumentUpdateService } from '@src/api/document/service/document.update';
import {
  ListDocumentQuery,
  ReadDocumentQuery,
  SearchDocumentQuery,
} from '@src/api/document/dto/read-document.dto';

@Controller('/document')
export class DocumentController {
  constructor(
    private readonly documentCreateService: DocumentCreateService,
    private readonly documentReadService: DocumentReadService,
    private readonly documentUpdateService: DocumentUpdateService,
  ) {}

  @Post()
  public async createDocument(@Ip() ip, @Body() body: CreateDocumentBody) {
    return this.documentCreateService.createDocument(body, ip);
  }

  @Get('/search')
  public async searchDocument(@Query() query: SearchDocumentQuery) {
    return this.documentReadService.searchDocument(
      query.field,
      query.word,
      query.page,
    );
  }

  @Get('/list')
  public async listDocument(@Query() query: ListDocumentQuery) {
    return this.documentReadService.listDocument(query.page);
  }

  @Get()
  public async readDocument(@Query() query: ReadDocumentQuery) {
    return this.documentReadService.singleDocument(query.documentId);
  }

  @Patch()
  public async updateDocument(@Body() body: UpdateDocumentBody) {
    return this.documentUpdateService.updateDocument(body);
  }
}
