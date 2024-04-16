import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '#src/core/users/user.entity';
import { Task } from '#src/core/tasks/entities/task.entity';
import { AssetEntity } from '#src/core/assets/entities/asset.entity';
import { HouseEntity } from '#src/core/houses/entity/house.entity';

@Entity()
export class TaskStatus {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @ManyToOne(() => UserEntity, (user) => user.tasksInProgress, {
    nullable: false,
  })
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @ManyToOne(() => Task, (task) => task.usersProgress)
  @JoinColumn({ name: 'task' })
  task: Task;

  @OneToOne(() => AssetEntity, (asset) => asset.confirmation, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'asset' })
  asset?: AssetEntity;

  @ManyToOne(() => HouseEntity, (house) => house.confirmations, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  house: HouseEntity;

  @Column({ nullable: false })
  status: string;
}
