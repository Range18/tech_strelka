import { ApiProperty } from '@nestjs/swagger';
import { Task } from '#src/core/tasks/entities/task.entity';
import { TaskType } from '#src/core/task-types/entities/task-type.entity';
import ms from 'ms';
import { backendServer } from '#src/common/configs/config';

export class GetTaskRdo {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly title: string;

  @ApiProperty({ nullable: true })
  readonly description?: string;

  @ApiProperty({ nullable: true })
  readonly expireAt?: Date;

  @ApiProperty({ nullable: true })
  readonly timeUntil?: string;

  @ApiProperty()
  readonly image?: string;

  @ApiProperty()
  readonly prize: number;

  @ApiProperty({ nullable: true, type: TaskType })
  readonly type?: TaskType;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  constructor(task: Task) {
    this.id = task.id;
    this.title = task.title;
    this.description = task.description;
    this.expireAt = task.expireAt;

    if (task.expireAt) {
      const timeUntil = new Date(task.expireAt).getTime() - Date.now();
      this.timeUntil =
        timeUntil <= 0 ? `Выполнение задания окончено` : ms(timeUntil);
    }

    this.image = task.image
      ? `${backendServer.urlValue}/api/assets/${task.image.id}/file`
      : undefined;
    this.prize = task.prize;
    this.type = task.type ? task.type : undefined;

    this.createdAt = task.createdAt;
    this.updatedAt = task.updatedAt;
  }
}
