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
import { EventsService } from '#src/core/events/events.service';
import { Event } from '#src/core/events/entities/event.entity';
import { TasksService } from '#src/core/tasks/tasks.service';
import { Task } from '#src/core/tasks/entities/task.entity';
import StorageExceptions = AllExceptions.StorageExceptions;
import HousesExceptions = AllExceptions.HousesExceptions;
import EventExceptions = AllExceptions.EventExceptions;
import TaskExceptions = AllExceptions.TaskExceptions;

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
    private readonly eventsService: EventsService,
    private readonly tasksService: TasksService,
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

  async upload(
    file: Express.Multer.File,
    id: number,
    type: 'house' | 'user' | 'event' | 'task',
  ) {
    let entity: HouseEntity | Event | Task;

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

      case 'event':
        entity = await this.eventsService.findOne({
          where: { id },
          relations: { image: true },
        });

        if (!entity) {
          throw new ApiException(
            HttpStatus.NOT_FOUND,
            'EventExceptions',
            EventExceptions.NotFound,
          );
        }

        break;

      case 'task':
        entity = await this.tasksService.findOne({
          where: { id },
          relations: { image: true },
        });

        if (!entity) {
          throw new ApiException(
            HttpStatus.NOT_FOUND,
            'TaskExceptions',
            TaskExceptions.NotFound,
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
