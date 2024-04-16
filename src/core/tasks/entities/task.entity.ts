import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '#src/common/base.entity';
import { TaskStatus } from '#src/core/task-confirmation/entities/task-confirmation.entity';
import { TaskType } from '#src/core/task-types/entities/task-type.entity';

@Entity('tasks')
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  expireAt?: Date;

  @Column({ nullable: false })
  prize: number;

  @OneToMany(() => TaskStatus, (status) => status.task, { nullable: true })
  usersProgress?: TaskStatus[];

  @ManyToOne(() => TaskType, (type) => type.tasks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  type?: TaskType;
}
