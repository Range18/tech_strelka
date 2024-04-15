import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '#src/core/users/user.entity';
import { Task } from '#src/core/tasks/entities/task.entity';

@Entity()
export class TaskStatus {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @ManyToOne(() => UserEntity, (user) => user.tasksInProgress, {
    nullable: false,
  })
  user: UserEntity;

  @OneToOne(() => Task, (task) => task.progress, { nullable: false })
  task: Task;

  @Column({ nullable: false })
  status: string;
}
