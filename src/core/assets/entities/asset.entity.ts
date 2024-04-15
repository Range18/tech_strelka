import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '#src/common/base.entity';
import { HouseEntity } from '#src/core/houses/entity/house.entity';

@Entity('assets')
export class AssetEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  path: string;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false })
  mimetype: string;

  //
  // @OneToOne(() => UserEntity, (user) => user.avatars, {
  //   nullable: true,
  //   onDelete: 'CASCADE',
  // })
  // user?: UserEntity;

  @OneToOne(() => HouseEntity, (house) => house.image, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  house: HouseEntity;
}
