import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetEntity } from '#src/core/assets/entities/asset.entity';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from '#src/core/assets/multer-config.service';
import { UserEntity } from '#src/core/users/user.entity';
import { UserModule } from '#src/core/users/user.module';
import { HouseEntity } from '#src/core/houses/entity/house.entity';
import { HousesModule } from '#src/core/houses/houses.module';
import { Task } from '#src/core/tasks/entities/task.entity';
import { EventsModule } from '#src/core/events/events.module';
import { TasksModule } from '#src/core/tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AssetEntity, UserEntity, HouseEntity, Task]),
    HousesModule,
    MulterModule.registerAsync({ useClass: MulterConfigService }),
    UserModule,
    EventsModule,
    TasksModule,
  ],
  controllers: [AssetsController],
  providers: [AssetsService],
})
export class AssetsModule {}
