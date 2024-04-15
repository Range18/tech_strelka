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

@Module({
  imports: [
    TypeOrmModule.forFeature([AssetEntity, UserEntity, HouseEntity]),
    HousesModule,
    MulterModule.registerAsync({ useClass: MulterConfigService }),
    UserModule,
  ],
  controllers: [AssetsController],
  providers: [AssetsService],
})
export class AssetsModule {}
