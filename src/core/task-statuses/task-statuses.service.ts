import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity.service';
import { TaskStatus } from '#src/core/task-statuses/entities/task-status.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import TaskExceptions = AllExceptions.TaskExceptions;

@Injectable()
export class TaskStatusesService extends BaseEntityService<
  TaskStatus,
  'TaskExceptions'
> {
  constructor(
    @InjectRepository(TaskStatus) tasksRepository: Repository<TaskStatus>,
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
}
