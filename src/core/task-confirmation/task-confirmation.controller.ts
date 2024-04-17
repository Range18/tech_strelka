import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TaskConfirmationService } from './task-confirmation.service';
import { CreateTaskConfirmationDto } from './dto/create-task-confirmation.dto';
import { UpdateTaskConfirmationDto } from './dto/update-task-confirmation.dto';
import { ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '#src/common/decorators/guards/authGuard.decorator';
import { User } from '#src/common/decorators/User.decorator';
import { type UserRequest } from '#src/common/types/user-request.type';
import { GetTaskStatusRdo } from '#src/core/task-confirmation/rdo/get-confirmation.rdo';
import { CustomConfirmationService } from '#src/core/task-confirmation/custom-tasks.service';
import { CreateCustomConfirmationDto } from '#src/core/task-confirmation/dto/create-custom-confirmation.dto';

@ApiTags('Task Status')
@Controller('api/task-confirmation')
export class TaskConfirmationController {
  constructor(
    private readonly taskStatusesService: TaskConfirmationService,
    private readonly customConfirmationService: CustomConfirmationService,
  ) {}

  @ApiHeader({ name: 'Authorization' })
  @AuthGuard()
  @Post()
  async create(
    @Body() createTaskConfirmationDto: CreateTaskConfirmationDto,
    @User() user: UserRequest,
  ) {
    return new GetTaskStatusRdo(
      await this.taskStatusesService.confirmTask(
        createTaskConfirmationDto,
        user.id,
      ),
    );
  }

  @ApiHeader({ name: 'Authorization' })
  @AuthGuard()
  @Post('/custom')
  async createCustom(
    @Body() createCustomConfirmationDto: CreateCustomConfirmationDto,
    @User() user: UserRequest,
  ) {
    return new GetTaskStatusRdo(
      await this.customConfirmationService.confirmArchive(
        user.id,
        createCustomConfirmationDto,
      ),
    );
  }

  @Get()
  async findAll() {
    const statuses = await this.taskStatusesService.find({
      relations: { image: true, task: true, house: true, user: true },
    });

    return statuses.map((status) => new GetTaskStatusRdo(status));
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return new GetTaskStatusRdo(
      await this.taskStatusesService.findOne({ where: { id } }),
    );
  }

  @Patch(':id')
  @ApiQuery({ name: 'isCustom' })
  async update(
    @Param('id') id: number,
    @Body() updateTaskStatusDto: UpdateTaskConfirmationDto,
    @Query('isCustom') isCustom: boolean,
  ) {
    return new GetTaskStatusRdo(
      await this.taskStatusesService.approveTaskConfirmation(
        id,
        updateTaskStatusDto,
      ),
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.taskStatusesService.remove({ where: { id } });
  }
}
