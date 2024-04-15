import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { HousesService } from '#src/core/houses/houses.service';
import { HouseEntity } from '#src/core/houses/entity/house.entity';
import { UpdateHouseDto } from '#src/core/houses/dto/update-house.dto';
import { CreateHouseDto } from '#src/core/houses/dto/create-house.dto';

@ApiTags('Houses')
@Controller('api/houses')
export class HousesController {
  constructor(private readonly housesService: HousesService) {}

  @ApiOkResponse({ type: HouseEntity })
  @Post()
  async create(@Body() createHouseDto: CreateHouseDto) {
    return await this.housesService.save(createHouseDto);
  }

  @ApiOkResponse({ type: [HouseEntity] })
  @Get()
  async getAll() {
    return await this.housesService.find({});
  }

  @ApiOkResponse({ type: HouseEntity })
  @Get(':id')
  async getHouse(@Param('id') id: number) {
    return await this.housesService.findOne({ where: { id } });
  }

  // TODO PERMS
  @ApiOkResponse({ type: HouseEntity })
  @ApiBody({ type: UpdateHouseDto })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateHouseDto: UpdateHouseDto,
  ) {
    return await this.housesService.updateOne(
      { where: { id } },
      updateHouseDto,
    );
  }
}
