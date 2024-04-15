import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { HouseEntity } from '#src/core/houses/entity/house.entity';
import HousesExceptions = AllExceptions.HousesExceptions;

@Injectable()
export class HousesService extends BaseEntityService<
  HouseEntity,
  'HousesExceptions'
> {
  constructor(
    @InjectRepository(HouseEntity)
    private readonly housesRepository: Repository<HouseEntity>,
  ) {
    super(
      housesRepository,
      new ApiException<'HousesExceptions'>(
        HttpStatus.NOT_FOUND,
        'HousesExceptions',
        HousesExceptions.NotFound,
      ),
    );
  }
}
