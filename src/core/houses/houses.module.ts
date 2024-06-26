import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HouseEntity } from '#src/core/houses/entity/house.entity';
import { HousesService } from '#src/core/houses/houses.service';
import { HousesController } from '#src/core/houses/houses.controller';
import { UserEntity } from '#src/core/users/user.entity';
import { AssetEntity } from '#src/core/assets/entities/asset.entity';
import { TaskStatus } from '#src/core/task-confirmation/entities/task-confirmation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HouseEntity,
      UserEntity,
      AssetEntity,
      TaskStatus,
    ]),
  ],
  providers: [HousesService],
  controllers: [HousesController],
  exports: [HousesService],
})
export class HousesModule {}
