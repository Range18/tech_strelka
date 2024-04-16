import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskTypesService } from './task-types.service';
import { CreateTaskTypeDto } from './dto/create-task-type.dto';
import { UpdateTaskTypeDto } from './dto/update-task-type.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Task Types')
@Controller('api/task-types')
export class TaskTypesController {
  constructor(private readonly taskTypesService: TaskTypesService) {}

  @Post()
  async create(@Body() createTaskTypeDto: CreateTaskTypeDto) {
    return await this.taskTypesService.save(createTaskTypeDto);
  }

  @Get()
  async findAll() {
    return await this.taskTypesService.find({});
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.taskTypesService.findOne({ where: { id } });
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTaskTypeDto: UpdateTaskTypeDto,
  ) {
    return await this.taskTypesService.updateOne(
      { where: { id } },
      updateTaskTypeDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.taskTypesService.removeOne({ where: { id } });
  }
}
