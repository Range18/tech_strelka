import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '#src/common/base.entity';
import { TaskStatus } from '#src/core/task-confirmation/entities/task-confirmation.entity';
import { TaskType } from '#src/core/task-types/entities/task-type.entity';
import { Level } from '#src/core/levels/entities/level.entity';
import { AssetEntity } from '#src/core/assets/entities/asset.entity';

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

  @Column({ nullable: false, default: false })
  isForTeam: boolean;

  @OneToMany(() => TaskStatus, (status) => status.task, { nullable: true })
  usersProgress?: TaskStatus[];

  @ManyToOne(() => TaskType, (type) => type.tasks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'type' })
  type?: TaskType;

  @ManyToOne(() => Level, (level) => level.tasks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'level' })
  level?: Level;

  @OneToOne(() => AssetEntity, (image) => image.task, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'image' })
  image?: AssetEntity;
}
