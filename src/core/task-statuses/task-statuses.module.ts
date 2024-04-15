import { Module } from '@nestjs/common';
import { TaskStatusesService } from './task-statuses.service';
import { TaskStatusesController } from './task-statuses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskStatus } from '#src/core/task-statuses/entities/task-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskStatus])],
  controllers: [TaskStatusesController],
  providers: [TaskStatusesService],
})
export class TaskStatusesModule {}
