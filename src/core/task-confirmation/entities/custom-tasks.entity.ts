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
import { HouseEntity } from '#src/core/houses/entity/house.entity';
import { UserEntity } from '#src/core/users/user.entity';

@Entity('custom_archive_confirmations')
export class CustomTasksConfirmation extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => Level, (level) => level.customConfirmations, {
    nullable: false,
  })
  @JoinColumn({ name: 'level' })
  level: Level;

  @Column({ nullable: false })
  studentStatus: string;

  @OneToOne(() => AssetEntity, (asset) => asset.customConfirmations, {
    nullable: false,
  })
  @JoinColumn({ name: 'asset' })
  image: AssetEntity;

  @ManyToOne(() => HouseEntity, (house) => house.customConfirmations, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'house' })
  house: HouseEntity;

  @ManyToOne(() => UserEntity, (user) => user.customConfirmations, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @Column({ nullable: false })
  status: string;

  @Column({ nullable: true })
  prize?: number;
}
