import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from '#src/core/events/entities/event.entity';
import { Task } from '#src/core/tasks/entities/task.entity';

@Entity()
export class Level {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => Event, (event) => event.level, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  events?: Event[];

  @OneToMany(() => Task, (task) => task.level, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  tasks?: Task[];
}