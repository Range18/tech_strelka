import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { HousesService } from '#src/core/houses/houses.service';
import { UpdateHouseDto } from '#src/core/houses/dto/update-house.dto';
import { CreateHouseDto } from '#src/core/houses/dto/create-house.dto';
import { GetHouseRdo } from '#src/core/houses/rdo/get-house.rdo';

@ApiTags('Houses')
@Controller('api/houses')
export class HousesController {
  constructor(private readonly housesService: HousesService) {}

  @ApiOkResponse({ type: GetHouseRdo })
  @Post()
  async create(@Body() createHouseDto: CreateHouseDto) {
    return new GetHouseRdo(await this.housesService.save(createHouseDto));
  }

  @ApiOkResponse({ type: [GetHouseRdo] })
  @Get()
  async getAll() {
    const houses = await this.housesService.find({
      relations: { image: true },
    });

    return houses.map((house) => new GetHouseRdo(house));
  }

  @ApiOkResponse({ type: GetHouseRdo })
  @Get(':id')
  async getHouse(@Param('id') id: number) {
    return new GetHouseRdo(
      await this.housesService.findOne({
        where: { id },
        relations: { image: true },
      }),
    );
  }

  // TODO PERMS
  @ApiOkResponse({ type: GetHouseRdo })
  @ApiBody({ type: UpdateHouseDto })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateHouseDto: UpdateHouseDto,
  ) {
    return new GetHouseRdo(
      await this.housesService.updateOne(
        { where: { id }, relations: { image: true } },
        updateHouseDto,
      ),
    );
  }
}
