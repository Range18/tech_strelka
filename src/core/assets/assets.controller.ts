import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AssetsService } from './assets.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { type Response } from 'express';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetFileRdo } from '#src/core/assets/rdo/get-file.rdo';

@ApiTags('Assets')
@Controller('api')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @ApiCreatedResponse({ type: GetFileRdo })
  @UseInterceptors(FileInterceptor('file'))
  @Post('/houses/:id/assets')
  async uploadHouseImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
  ) {
    return new GetFileRdo(await this.assetsService.upload(file, id, 'house'));
  }

  // @ApiCreatedResponse({ type: GetFileRdo })
  // @UseInterceptors(FileInterceptor('file'))
  // @Post('/users/:id/assets')
  // async uploadUserAvatar(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Param('id') id: number,
  // ) {
  //   return new GetFileRdo(await this.assetsService.upload(file, id, 'user'));
  // }

  @ApiCreatedResponse({ type: GetFileRdo })
  @UseInterceptors(FileInterceptor('file'))
  @Post('/tasks/:id/assets')
  async uploadTaskImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
  ) {
    return new GetFileRdo(await this.assetsService.upload(file, id, 'task'));
  }

  @ApiCreatedResponse({ type: GetFileRdo })
  @UseInterceptors(FileInterceptor('file'))
  @Post('/events/:id/assets')
  async uploadEventImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
  ) {
    return new GetFileRdo(await this.assetsService.upload(file, id, 'event'));
  }

  @ApiCreatedResponse({ type: GetFileRdo })
  @UseInterceptors(FileInterceptor('file'))
  @Post('/task-confirmations/:id/assets')
  async uploadConfirmImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
  ) {
    return new GetFileRdo(await this.assetsService.upload(file, id, 'confirm'));
  }

  @ApiCreatedResponse({ type: GetFileRdo })
  @UseInterceptors(FileInterceptor('file'))
  @Post('/custom-task-confirmations/:id/assets')
  async uploadCustomConfirmImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
  ) {
    return new GetFileRdo(
      await this.assetsService.upload(file, id, 'customConfirm'),
    );
  }

  @Get('assets/:id/file')
  @Get('assets/:id/file')
  async GetImageStream(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: number,
  ) {
    const { buffer, mimetype } = await this.assetsService.getFileStream(id);

    res.setHeader('Content-Type', mimetype);

    return buffer;
  }

  @ApiOkResponse({ type: GetFileRdo })
  @Get('assets/:id')
  @Get('assets/:id')
  async findOne(@Param('id') id: number) {
    return new GetFileRdo(await this.assetsService.findOne({ where: { id } }));
  }

  @Delete('assets/:id')
  async remove(@Param('id') id: number) {
    return await this.assetsService.deleteFile(id);
  }
}
