import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '#src/core/users/user.entity';
import { BaseEntity } from '#src/common/base.entity';
import { AssetEntity } from '#src/core/assets/entities/asset.entity';

@Entity('houses')
export class HouseEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ type: 'longtext', nullable: true })
  description?: string;

  @Column({ type: 'longtext', nullable: true })
  ourValues?: string;

  @Column({ nullable: false, default: 0 })
  totalPoints: number;

  @OneToMany(() => UserEntity, (user) => user.house, { onDelete: 'CASCADE' })
  users: UserEntity[];

  @OneToOne(() => AssetEntity, (image) => image.house, {
    nullable: true,
  })
  @JoinColumn({ name: 'image' })
  image?: AssetEntity;
}
