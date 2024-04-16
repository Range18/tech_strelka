import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskRdo } from '#src/core/tasks/rdo/get-task.rdo';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return new GetTaskRdo(await this.tasksService.save(createTaskDto));
  }

  @Get()
  @ApiQuery({ type: Number, name: 'type' })
  async findAll(@Query('typeId') typeId: number) {
    const tasks = await this.tasksService.find({
      where: { type: typeId ? { id: typeId } : undefined },
      relations: { type: true, usersProgress: true, image: true },
    });

    return tasks.map((task) => new GetTaskRdo(task));
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return new GetTaskRdo(
      await this.tasksService.findOne({
        where: { id },
        relations: { type: true, usersProgress: true, image: true },
      }),
    );
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return new GetTaskRdo(
      await this.tasksService.updateOne(
        {
          where: { id },
          relations: { type: true, usersProgress: true, image: true },
        },
        updateTaskDto,
      ),
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.tasksService.removeOne({ where: { id } });
  }
}
