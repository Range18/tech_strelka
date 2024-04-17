import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity.service';
import { TaskStatus } from '#src/core/task-confirmation/entities/task-confirmation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import { CreateTaskConfirmationDto } from '#src/core/task-confirmation/dto/create-task-confirmation.dto';
import { TasksService } from '#src/core/tasks/tasks.service';
import { UpdateTaskConfirmationDto } from '#src/core/task-confirmation/dto/update-task-confirmation.dto';
import { StatusType } from '#src/core/task-confirmation/statuses.constants';
import { UserService } from '#src/core/users/user.service';
import { HousesService } from '#src/core/houses/houses.service';
import { CustomConfirmationService } from '#src/core/task-confirmation/custom-tasks.service';
import { CustomTasksConfirmation } from '#src/core/task-confirmation/entities/custom-tasks.entity';
import TaskExceptions = AllExceptions.TaskExceptions;
import StatusExceptions = AllExceptions.StatusExceptions;
import UserExceptions = AllExceptions.UserExceptions;

@Injectable()
export class TaskConfirmationService extends BaseEntityService<
  TaskStatus,
  'TaskExceptions'
> {
  constructor(
    @InjectRepository(TaskStatus) tasksRepository: Repository<TaskStatus>,
    private readonly taskService: TasksService,
    private readonly userService: UserService,
    private readonly houseService: HousesService,
    private readonly customConfirmationService: CustomConfirmationService,
  ) {
    super(
      tasksRepository,
      new ApiException<'TaskExceptions'>(
        HttpStatus.NOT_FOUND,
        'TaskExceptions',
        TaskExceptions.NotFound,
      ),
    );
  }
  async confirmTask(
    createTaskConfirmationsDto: CreateTaskConfirmationDto,
    userId: number,
  ) {
    const task = await this.taskService.findOne({
      where: { id: createTaskConfirmationsDto.task },
      relations: { usersProgress: { user: true } },
    });

    if (!task) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'TaskExceptions',
        TaskExceptions.NotFound,
      );
    }

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

    if (task.expireAt && new Date(task.expireAt).getTime() - Date.now() <= 0) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        'TaskExceptions',
        TaskExceptions.TaskExpired,
      );
    }

    if (
      task.usersProgress &&
      task.usersProgress?.some(
        (confirmation) => confirmation.user.id === userId,
      )
    ) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        'TaskExceptions',
        TaskExceptions.AlreadyDone,
      );
    }
    return await this.save({
      task: { id: createTaskConfirmationsDto.task },
      user: user,
      status: 'InApprove',
      house: { id: user.house.id },
    });
  }

  async approveTaskConfirmation(
    confirmationId: number,
    updateTaskStatusDto: UpdateTaskConfirmationDto,
    isCustom = false,
  ) {
    let confirmation: CustomTasksConfirmation | TaskStatus;

    if (!isCustom) {
      confirmation = await this.findOne({
        where: { id: confirmationId },
        relations: { user: true, task: true, house: true },
      });
    } else {
      confirmation = await this.customConfirmationService.findOne({
        where: { id: confirmationId },
        relations: { user: true, house: true },
      });
    }

    if (!confirmation) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'StatusExceptions',
        StatusExceptions.NotFound,
      );
    }

    if (updateTaskStatusDto.status === confirmation.status) return confirmation;

    confirmation.status = updateTaskStatusDto.status;
    if (isCustom) {
      confirmation['prize'] = updateTaskStatusDto.prize;

      if (confirmation.status === StatusType.Done) {
        confirmation.user.points += confirmation['prize'];
        confirmation.house.totalPoints += confirmation['prize'];
      } else if (confirmation.status === StatusType.InApprove) {
        confirmation.user.points -= confirmation['prize'];
        confirmation.house.totalPoints -= confirmation['prize'];
      } else if (
        confirmation.status === StatusType.Done &&
        updateTaskStatusDto.status === StatusType.Denied
      ) {
        confirmation.user.points -= confirmation['prize'];
        confirmation.house.totalPoints -= confirmation['prize'];
      }
    } else {
      if (confirmation.status === StatusType.Done) {
        confirmation.user.points += confirmation['task'].prize;
        confirmation.house.totalPoints += confirmation['task'].prize;
      } else if (confirmation.status === StatusType.InApprove) {
        confirmation.user.points -= confirmation['task'].prize;
        confirmation.house.totalPoints -= confirmation['task'].prize;
      } else if (
        confirmation.status === StatusType.Done &&
        updateTaskStatusDto.status === StatusType.Denied
      ) {
        confirmation.user.points -= confirmation['task'].prize;
        confirmation.house.totalPoints -= confirmation['task'].prize;
      }
    }
    await this.userService.save(confirmation.user);
    await this.houseService.save(confirmation.house);
    return await this.save(confirmation);
  }
}
