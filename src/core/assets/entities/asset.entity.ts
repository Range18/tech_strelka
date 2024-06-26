import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '#src/common/base.entity';
import { HouseEntity } from '#src/core/houses/entity/house.entity';
import { TaskStatus } from '#src/core/task-confirmation/entities/task-confirmation.entity';
import { Event } from '#src/core/events/entities/event.entity';
import { Task } from '#src/core/tasks/entities/task.entity';
import { CustomTasksConfirmation } from '#src/core/task-confirmation/entities/custom-tasks.entity';

@Entity('assets')
export class AssetEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  path: string;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false })
  mimetype: string;

  //
  // @OneToOne(() => UserEntity, (user) => user.avatars, {
  //   nullable: true,
  //   onDelete: 'CASCADE',
  // })
  // user?: UserEntity;

  @OneToOne(() => HouseEntity, (house) => house.image, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  house?: HouseEntity;

  @OneToOne(() => TaskStatus, (confirmation) => confirmation.image, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  confirmation?: TaskStatus;

  @OneToOne(() => Event, (event) => event.image, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  event?: Event;

  @OneToOne(() => Task, (task) => task.image, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  task?: Task;

  @OneToOne(() => CustomTasksConfirmation, (task) => task.image, {
    nullable: true,
  })
  customConfirmations?: CustomTasksConfirmation[];
}
