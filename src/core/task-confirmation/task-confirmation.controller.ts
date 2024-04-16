import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TaskConfirmationService } from './task-confirmation.service';
import { CreateTaskConfirmationDto } from './dto/create-task-confirmation.dto';
import { UpdateTaskConfirmationDto } from './dto/update-task-confirmation.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Task Status')
@Controller('api/task-confirmation')
export class TaskConfirmationController {
  constructor(private readonly taskStatusesService: TaskConfirmationService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createTaskConfirmationDto: CreateTaskConfirmationDto,
  ) {
    return this.taskStatusesService.confirmTask(
      createTaskConfirmationDto,
      file,
    );
  }

  @Get()
  async findAll() {
    return await this.taskStatusesService.find({});
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.taskStatusesService.findOne({ where: { id } });
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTaskStatusDto: UpdateTaskConfirmationDto,
  ) {
    return await this.taskStatusesService.updateOne(
      { where: { id } },
      updateTaskStatusDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.taskStatusesService.remove({ where: { id } });
  }
}
