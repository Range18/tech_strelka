import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '#src/core/tasks/entities/task.entity';
import { TaskStatus } from '#src/core/task-confirmation/entities/task-confirmation.entity';
import { TaskType } from '#src/core/task-types/entities/task-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, TaskStatus, TaskType])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
