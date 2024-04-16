import { Module } from '@nestjs/common';
import { LevelsService } from './levels.service';
import { LevelsController } from './levels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level } from '#src/core/levels/entities/level.entity';
import { Task } from '#src/core/tasks/entities/task.entity';
import { Event } from '#src/core/events/entities/event.entity';
import { TaskStatus } from '#src/core/task-confirmation/entities/task-confirmation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Level, Task, Event, TaskStatus])],
  controllers: [LevelsController],
  providers: [LevelsService],
})
export class LevelsModule {}
