import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskConfirmationService } from './task-confirmation.service';
import { CreateTaskConfirmationDto } from './dto/create-task-confirmation.dto';
import { UpdateTaskConfirmationDto } from './dto/update-task-confirmation.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Task Status')
@Controller('api/task-confirmation')
export class TaskConfirmationController {
  constructor(private readonly taskStatusesService: TaskConfirmationService) {}

  @Post()
  async create(@Body() createTaskStatusDto: CreateTaskConfirmationDto) {
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
