import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LevelsService } from './levels.service';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Levels')
@Controller('api/levels')
export class LevelsController {
  constructor(private readonly levelsService: LevelsService) {}

  @Post()
  async create(@Body() createLevelDto: CreateLevelDto) {
    return await this.levelsService.save(createLevelDto);
  }

  @Get()
  async findAll() {
    return await this.levelsService.find({});
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.levelsService.findOne({ where: { id } });
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateLevelDto: UpdateLevelDto,
  ) {
    return await this.levelsService.updateOne(
      { where: { id } },
      updateLevelDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.levelsService.removeOne({ where: { id } });
  }
}
