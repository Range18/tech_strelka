import { Module } from '@nestjs/common';
import { TaskConfirmationService } from './task-confirmation.service';
import { TaskConfirmationController } from './task-confirmation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskStatus } from '#src/core/task-confirmation/entities/task-confirmation.entity';
import { Task } from '#src/core/tasks/entities/task.entity';
import { UserEntity } from '#src/core/users/user.entity';
import { AssetEntity } from '#src/core/assets/entities/asset.entity';
import { HouseEntity } from '#src/core/houses/entity/house.entity';
import { UserModule } from '#src/core/users/user.module';
import { Level } from '#src/core/levels/entities/level.entity';
import { TasksModule } from '#src/core/tasks/tasks.module';
import { SessionModule } from '#src/core/session/session.module';
import { TokenModule } from '#src/core/token/token.module';
import { HousesModule } from '#src/core/houses/houses.module';
import { CustomConfirmationService } from '#src/core/task-confirmation/custom-tasks.service';
import { CustomTasksConfirmation } from '#src/core/task-confirmation/entities/custom-tasks.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TaskStatus,
      Task,
      UserEntity,
      AssetEntity,
      HouseEntity,
      Level,
      CustomTasksConfirmation,
    ]),
    TasksModule,
    SessionModule,
    TokenModule,
    UserModule,
    HousesModule,
  ],
  controllers: [TaskConfirmationController],
  providers: [TaskConfirmationService, CustomConfirmationService],
  exports: [TaskConfirmationService],
})
export class TaskConfirmationModule {}
