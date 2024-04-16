import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '#src/core/tasks/entities/task.entity';
import { BaseEntity } from '#src/common/base.entity';

@Entity('task-types')
export class TaskType extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @OneToMany(() => Task, (task) => task.type, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  tasks?: Task[];
}
