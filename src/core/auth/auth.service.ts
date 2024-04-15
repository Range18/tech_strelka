import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoggedUserRdo } from '../users/rdo/logged-user.rdo';
import { UserService } from '../users/user.service';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { SessionService } from '../session/session.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import { RolesService } from '#src/core/roles/roles.service';
import AuthExceptions = AllExceptions.AuthExceptions;
import UserExceptions = AllExceptions.UserExceptions;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly rolesService: RolesService,
    private readonly sessionService: SessionService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<LoggedUserRdo> {
    const user = await this.userService.findOne(
      {
        where: { login: createUserDto.login },
      },
      false,
    );

    if (user) {
      throw new ApiException(
        HttpStatus.CONFLICT,
        'UserExceptions',
        UserExceptions.UserAlreadyExists,
      );
    }

    const userEntity = await this.userService.save({
      firstname: createUserDto.firstname,
      surname: createUserDto.surname,
      lastname: createUserDto.lastname,
      //TODO Enable
      // password: await bcrypt.hash(createUserDto.password, passwordSaltRounds),
      password: createUserDto.password,
      login: createUserDto.login,
      role: await this.rolesService.findOne({
        where: { name: createUserDto.role },
      }),
    });

    const session = await this.sessionService.createSession({
      userId: userEntity.id,
    });

    return new LoggedUserRdo(
      session.accessToken,
      session.sessionExpireAt,
      userEntity.login,
    );
  }

  async login(loginUserDto: LoginUserDto): Promise<LoggedUserRdo> {
    const user = await this.userService.findOne({
      where: { login: loginUserDto.login },
    });

    if (!user) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'UserExceptions',
        UserExceptions.UserNotFound,
      );
    }

    //TODO Enable
    // const comparedPasswords = await bcrypt.compare(
    //   loginUserDto.password,
    //   user.password,
    // );

    const comparedPasswords = loginUserDto.password === user.password;

    if (!comparedPasswords) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        'AuthExceptions',
        AuthExceptions.WrongPassword,
      );
    }
    const session = await this.sessionService.createSession({
      userId: user.id,
    });

    return new LoggedUserRdo(
      session.accessToken,
      session.sessionExpireAt,
      user.login,
    );
  }

  async logout(sessionId: string): Promise<void> {
    await this.sessionService.removeOne({
      where: { sessionId: sessionId },
    });
  }
}
