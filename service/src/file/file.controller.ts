import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { Public } from 'src/auth/decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Public()
@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Post('upload')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.fileService.create(file);
  }
}
