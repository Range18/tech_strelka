import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { SessionEntity } from '#src/core/session/session.entity';
import { UserController } from '#src/core/users/user.controller';
import { SessionService } from '#src/core/session/session.service';
import { TokenService } from '#src/core/token/token.service';
import { JwtService } from '@nestjs/jwt';
import { HouseEntity } from '#src/core/houses/entity/house.entity';
import { TaskStatus } from '#src/core/task-statuses/entities/task-status.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      HouseEntity,
      SessionEntity,
      HouseEntity,
      TaskStatus,
    ]),
  ],
  providers: [SessionService, TokenService, JwtService, UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
