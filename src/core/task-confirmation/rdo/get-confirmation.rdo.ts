import { TaskStatus } from '#src/core/task-confirmation/entities/task-confirmation.entity';
import { ApiProperty } from '@nestjs/swagger';
import { GetHouseRdo } from '#src/core/houses/rdo/get-house.rdo';
import { GetTaskRdo } from '#src/core/tasks/rdo/get-task.rdo';
import { GetUserRdo } from '#src/core/users/rdo/get-user.rdo';
import { backendServer } from '#src/common/configs/config';
import { CustomTasksConfirmation } from '#src/core/task-confirmation/entities/custom-tasks.entity';
import { GetLevelRdo } from '#src/core/levels/dto/get-level.rdo';

export class GetTaskStatusRdo {
  @ApiProperty()
  readonly id: number;

  @ApiProperty({ type: GetHouseRdo })
  house?: GetHouseRdo;

  @ApiProperty()
  image: string;

  @ApiProperty()
  status: string;

  @ApiProperty({ type: GetLevelRdo })
  level?: GetLevelRdo;

  @ApiProperty({ type: GetTaskRdo })
  task?: GetTaskRdo;

  @ApiProperty({ type: GetUserRdo })
  user?: GetUserRdo;

  constructor(status: TaskStatus | CustomTasksConfirmation) {
    this.id = status.id;
    this.status = status.status;
    this.user = status.user ? new GetUserRdo(status.user) : undefined;
    this.image = status.image
      ? `${backendServer.urlValue}/api/assets/${status.image.id}/file`
      : undefined;
    this.level = status['level'] ? new GetLevelRdo(status['level']) : undefined;

    this.task = status['task'] ? new GetTaskRdo(status['task']) : undefined;
    this.house = status.house ? new GetHouseRdo(status.house) : undefined;
  }
}
