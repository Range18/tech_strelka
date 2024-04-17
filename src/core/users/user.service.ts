import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity.service';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import UserExceptions = AllExceptions.UserExceptions;
import TaskExceptions = AllExceptions.TaskExceptions;

@Injectable()
export class UserService extends BaseEntityService<
  UserEntity,
  'UserExceptions'
> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super(
      userRepository,
      new ApiException<'UserExceptions'>(
        HttpStatus.NOT_FOUND,
        'UserExceptions',
        UserExceptions.UserNotFound,
      ),
    );
  }

  async getHouseRating(userId: number) {
    const user = await this.findOne({
      where: { id: userId },
      relations: { house: true },
    });

    if (!user) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'UserExceptions',
        UserExceptions.UserNotFound,
      );
    }

    if (!user.house) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        'TaskExceptions',
        TaskExceptions.HouseRequired,
      );
    }

    return await this.find({
      where: { house: { id: user.house.id } },
      order: { points: 'DESC' },
    });
  }
}
