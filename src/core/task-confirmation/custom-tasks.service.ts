import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '#src/core/users/user.service';
import { HousesService } from '#src/core/houses/houses.service';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import { CustomTasksConfirmation } from '#src/core/task-confirmation/entities/custom-tasks.entity';
import { CreateCustomConfirmationDto } from '#src/core/task-confirmation/dto/create-custom-confirmation.dto';
import JustExceptions = AllExceptions.JustExceptions;
import UserExceptions = AllExceptions.UserExceptions;
import TaskExceptions = AllExceptions.TaskExceptions;

@Injectable()
export class CustomConfirmationService extends BaseEntityService<
  CustomTasksConfirmation,
  'JustExceptions'
> {
  constructor(
    @InjectRepository(CustomTasksConfirmation)
    customTasksRepository: Repository<CustomTasksConfirmation>,
    private readonly userService: UserService,
    private readonly houseService: HousesService,
  ) {
    super(
      customTasksRepository,
      new ApiException<'JustExceptions'>(
        HttpStatus.NOT_FOUND,
        'JustExceptions',
        JustExceptions.NotFound,
      ),
    );
  }

  async confirmArchive(
    userId: number,
    createConfirmation: CreateCustomConfirmationDto,
  ) {
    const user = await this.userService.findOne({
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

    return await this.save({
      ...createConfirmation,
      user: user,
      house: user.house,
      level: { id: createConfirmation.levelId },
    });
  }
}
