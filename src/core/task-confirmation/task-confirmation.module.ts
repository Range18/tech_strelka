import { Module } from '@nestjs/common';
import { TaskConfirmationService } from './task-confirmation.service';
import { TaskConfirmationController } from './task-confirmation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskStatus } from '#src/core/task-confirmation/entities/task-confirmation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskStatus])],
  controllers: [TaskConfirmationController],
  providers: [TaskConfirmationService],
})
export class TaskConfirmationModule {}
