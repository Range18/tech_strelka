import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '#src/core/users/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '#src/common/base.entity';
import { Exclude } from 'class-transformer';

@Entity('houses')
export class HouseEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @ApiProperty({ uniqueItems: true })
  @Column({ nullable: false, unique: true })
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  description?: string;

  @Exclude()
  @OneToMany(() => UserEntity, (user) => user.house, { onDelete: 'CASCADE' })
  users: UserEntity[];
}
