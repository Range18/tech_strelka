import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
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
  @ApiQuery({ name: 'by' })
  @ApiQuery({ name: 'order' })
  @Get()
  async getAll(@Query('by') property: string, @Query('order') order: string) {
    const houses = await this.housesService.find({
      relations: { image: true, users: true },
      order: { [property]: order },
    });

    return houses.map((house) => new GetHouseRdo(house));
  }

  @ApiOkResponse({ type: GetHouseRdo })
  @Get(':id')
  async getHouse(@Param('id') id: number) {
    return new GetHouseRdo(
      await this.housesService.findOne({
        where: { id },
        relations: { image: true, users: true },
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
        { where: { id }, relations: { image: true, users: true } },
        updateHouseDto,
      ),
    );
  }
}
