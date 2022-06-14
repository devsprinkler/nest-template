import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { CreateDocumentBody } from '@src/api/document/dto/create-document.dto';
import { DocumentCreateService } from '@src/api/document/service/document.create';
import { DocumentReadService } from '@src/api/document/service/document.read';
import { UpdateDocumentDto } from '@src/api/document/dto/update-document.dto';
import { DocumentUpdateService } from '@src/api/document/service/document.update';
import { ListDocumentQuery, ReadDocumentQuery } from './dto/read-document.dto';

@Controller('/document')
export class DocumentController {
  constructor(
    private readonly documentCreateService: DocumentCreateService,
    private readonly documentReadService: DocumentReadService,
    private readonly documentUpdateService: DocumentUpdateService,
  ) {}

  @Post()
  public async createDocument(
    @Request() req,
    @Body() body: CreateDocumentBody,
  ) {
    return this.documentCreateService.createDocument(body, req.ip);
  }

  @Get('/list')
  public async listDocument(@Query() query: ListDocumentQuery) {
    return this.documentReadService.listDocument(query.page);
  }

  @Get()
  public async readDocument(@Query() query: ReadDocumentQuery) {
    return this.documentReadService.singleDocument(query.documentId);
  }

  @Put()
  public async updateDocument(@Body() updateDocumentDto: UpdateDocumentDto) {
    return this.documentUpdateService.updateDocument(updateDocumentDto);
  }
}
