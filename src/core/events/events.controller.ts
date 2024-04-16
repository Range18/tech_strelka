import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetEventRdo } from '#src/core/events/rdo/get-event.rdo';

@ApiTags('Events')
@Controller('api/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @ApiResponse({ type: GetEventRdo })
  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    return new GetEventRdo(
      await this.eventsService.save({
        ...createEventDto,
        level: { id: createEventDto.levelId },
      }),
    );
  }

  @ApiResponse({ type: [GetEventRdo] })
  @Get()
  async findAll() {
    const events = await this.eventsService.find({
      relations: { level: true, image: true },
    });

    return events.map((event) => new GetEventRdo(event));
  }

  @ApiResponse({ type: GetEventRdo })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return new GetEventRdo(
      await this.eventsService.findOne({
        where: { id },
        relations: { level: true, image: true },
      }),
    );
  }

  @ApiResponse({ type: GetEventRdo })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return new GetEventRdo(
      await this.eventsService.updateOne(
        { where: { id }, relations: { level: true, image: true } },
        updateEventDto,
      ),
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.eventsService.removeOne({ where: { id } });
  }
}
