import { ApiProperty } from '@nestjs/swagger';
import { Task } from '#src/core/tasks/entities/task.entity';
import { TaskType } from '#src/core/task-types/entities/task-type.entity';

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
  readonly prize: number;

  @ApiProperty({ type: TaskType })
  readonly type: TaskType;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  constructor(task: Task) {
    this.id = task.id;
    this.title = task.title;
    this.description = task.description;
    this.expireAt = task.expireAt;
    this.timeUntil = 'in dev todo';
    this.prize = task.prize;
    this.type = task.type;

    this.createdAt = task.createdAt;
    this.updatedAt = task.updatedAt;
  }
}
