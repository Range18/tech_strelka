import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity.service';
import { Level } from '#src/core/levels/entities/level.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import JustExceptions = AllExceptions.JustExceptions;

@Injectable()
export class LevelsService extends BaseEntityService<Level, 'JustExceptions'> {
  constructor(
    @InjectRepository(Level) private readonly levelRep: Repository<Level>,
  ) {
    super(
      levelRep,
      new ApiException<'JustExceptions'>(
        HttpStatus.NOT_FOUND,
        'JustExceptions',
        JustExceptions.NotFound,
      ),
    );
  }
}
