import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskType } from '#src/core/task-types/entities/task-type.entity';
import { Repository } from 'typeorm';
import { BaseEntityService } from '#src/common/base-entity.service';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import TaskTypeExceptions = AllExceptions.TaskTypeExceptions;

@Injectable()
export class TaskTypesService extends BaseEntityService<
  TaskType,
  'TaskTypeExceptions'
> {
  constructor(
    @InjectRepository(TaskType)
    private readonly taskTypeRepository: Repository<TaskType>,
  ) {
    super(
      taskTypeRepository,
      new ApiException<'TaskTypeExceptions'>(
        HttpStatus.NOT_FOUND,
        'TaskTypeExceptions',
        TaskTypeExceptions.NotFound,
      ),
    );
  }
}
