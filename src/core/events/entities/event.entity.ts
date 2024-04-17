import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '#src/common/base.entity';
import { Level } from '#src/core/levels/entities/level.entity';
import { AssetEntity } from '#src/core/assets/entities/asset.entity';

@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  expireAt: Date;

  @ManyToOne(() => Level, (level) => level.events, { nullable: false })
  @JoinColumn({ name: 'level' })
  level: Level;

  @Column({ nullable: false, default: 0 })
  prize: number;

  @OneToOne(() => AssetEntity, (image) => image.event, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'image' })
  image?: AssetEntity;

  @Column({ nullable: true })
  link?: string;
}
