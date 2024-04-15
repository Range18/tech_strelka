import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '#src/core/tasks/entities/task.entity';
import { TaskStatus } from '#src/core/task-statuses/entities/task-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, TaskStatus])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
