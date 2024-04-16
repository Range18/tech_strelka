import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '#src/core/events/entities/event.entity';
import { Level } from '#src/core/levels/entities/level.entity';
import { UserEntity } from '#src/core/users/user.entity';
import { TaskStatus } from '#src/core/task-confirmation/entities/task-confirmation.entity';
import { AssetEntity } from '#src/core/assets/entities/asset.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Event,
      Level,
      UserEntity,
      TaskStatus,
      Level,
      AssetEntity,
    ]),
  ],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
