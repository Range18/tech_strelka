import { HttpStatus, Injectable, StreamableFile } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity.service';
import { AssetEntity } from '#src/core/assets/entities/asset.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiException } from '#src/common/exception-handler/api-exception';

import { unlink } from 'fs/promises';
import { storageConfig } from '#src/common/configs/storage.config';
import { join } from 'path';
import { createReadStream } from 'fs';
import { UserService } from '#src/core/users/user.service';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import { HouseEntity } from '#src/core/houses/entity/house.entity';
import { HousesService } from '#src/core/houses/houses.service';
import StorageExceptions = AllExceptions.StorageExceptions;
import HousesExceptions = AllExceptions.HousesExceptions;

@Injectable()
export class AssetsService extends BaseEntityService<
  AssetEntity,
  'StorageExceptions'
> {
  constructor(
    @InjectRepository(AssetEntity)
    private readonly assetsRepository: Repository<AssetEntity>,
    private readonly userService: UserService,
    private readonly houseService: HousesService,
  ) {
    super(
      assetsRepository,
      new ApiException<'StorageExceptions'>(
        HttpStatus.NOT_FOUND,
        'StorageExceptions',
        StorageExceptions.NotFound,
      ),
    );
  }

  async upload(file: Express.Multer.File, id: number, type: 'house' | 'user') {
    let entity: HouseEntity;

    switch (type) {
      case 'house':
        entity = await this.houseService.findOne({
          where: { id },
          relations: { image: true },
        });

        if (!entity) {
          throw new ApiException(
            HttpStatus.NOT_FOUND,
            'HousesExceptions',
            HousesExceptions.NotFound,
          );
        }

        break;
    }

    if (entity.image) {
      await unlink(entity.image.path);

      await this.removeOne(entity.image);
    }

    return await this.save({
      name: file.filename,
      [type]: { id: id },
      type: type,
      path: file.path,
      mimetype: file.mimetype,
    });
  }

  async getFileStream(id: number) {
    const image = await this.findOne({ where: { id } });

    if (!image) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'StorageExceptions',
        StorageExceptions.NotFound,
      );
    }

    try {
      const stream = createReadStream(image.path);

      return { buffer: new StreamableFile(stream), mimetype: image.mimetype };
    } catch (error) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'StorageExceptions',
        StorageExceptions.NotFound,
      );
    }
  }

  async deleteFile(id: number) {
    const image = await this.findOne({ where: { id } });

    if (!image) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'StorageExceptions',
        StorageExceptions.NotFound,
      );
    }

    try {
      await unlink(
        join(storageConfig.path, storageConfig.innerSections, image.name),
      );
    } catch (error) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'StorageExceptions',
        StorageExceptions.NotFound,
      );
    }
  }
}
