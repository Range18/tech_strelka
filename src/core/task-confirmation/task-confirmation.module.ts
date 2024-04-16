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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TaskStatus,
      Task,
      UserEntity,
      AssetEntity,
      HouseEntity,
    ]),
    UserModule,
  ],
  controllers: [TaskConfirmationController],
  providers: [TaskConfirmationService],
})
export class TaskConfirmationModule {}
