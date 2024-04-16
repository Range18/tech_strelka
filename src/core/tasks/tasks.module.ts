import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '#src/core/tasks/entities/task.entity';
import { TaskStatus } from '#src/core/task-confirmation/entities/task-confirmation.entity';
import { TaskType } from '#src/core/task-types/entities/task-type.entity';
import { Level } from '#src/core/levels/entities/level.entity';
import { AssetEntity } from '#src/core/assets/entities/asset.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, TaskStatus, TaskType, Level, AssetEntity]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
