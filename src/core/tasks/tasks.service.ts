import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity.service';
import { Task } from '#src/core/tasks/entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import TaskExceptions = AllExceptions.TaskExceptions;

@Injectable()
export class TasksService extends BaseEntityService<Task, 'TaskExceptions'> {
  constructor(
    @InjectRepository(Task) private readonly tasksRepository: Repository<Task>,
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
