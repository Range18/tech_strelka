import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskStatusesService } from './task-statuses.service';
import { CreateTaskStatusDto } from './dto/create-task-status.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Task Status')
@Controller('api/task-statuses')
export class TaskStatusesController {
  constructor(private readonly taskStatusesService: TaskStatusesService) {}

  @Post()
  async create(@Body() createTaskStatusDto: CreateTaskStatusDto) {
    return await this.taskStatusesService.save({
      task: { id: createTaskStatusDto.task },
      user: { id: createTaskStatusDto.user },
      status: createTaskStatusDto.status,
    });
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
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
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
