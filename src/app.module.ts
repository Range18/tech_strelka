import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from '#src/common/configs/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '#src/core/auth/auth.module';
import { UserModule } from '#src/core/users/user.module';
import { RolesModule } from '#src/core/roles/roles.module';
import { SessionModule } from '#src/core/session/session.module';
import { HousesModule } from '#src/core/houses/houses.module';
import { TasksModule } from '#src/core/tasks/tasks.module';
import { AssetsModule } from '#src/core/assets/assets.module';
import { TaskType } from '#src/core/task-types/entities/task-type.entity';
import { TaskTypesModule } from '#src/core/task-types/task-types.module';
import { LevelsModule } from '#src/core/levels/levels.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UserModule,
    RolesModule,
    SessionModule,
    HousesModule,
    TasksModule,
    AssetsModule,
    TaskType,
    TaskTypesModule,
    LevelsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
