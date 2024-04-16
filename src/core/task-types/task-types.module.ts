import { Module } from '@nestjs/common';
import { TaskTypesService } from './task-types.service';
import { TaskTypesController } from './task-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskType } from '#src/core/task-types/entities/task-type.entity';
import { Task } from '#src/core/tasks/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskType, Task])],
  controllers: [TaskTypesController],
  providers: [TaskTypesService],
})
export class TaskTypesModule {}
