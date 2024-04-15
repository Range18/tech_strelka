import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '#src/common/base.entity';
import { TaskStatus } from '#src/core/task-statuses/entities/task-status.entity';

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

  @OneToOne(() => TaskStatus, (status) => status.task, { nullable: true })
  progress?: TaskStatus;
}
