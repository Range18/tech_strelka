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

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UserModule,
    RolesModule,
    SessionModule,
    HousesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
