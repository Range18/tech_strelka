import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { UserService } from '#src/core/users/user.service';
import { ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetUserRdo } from '#src/core/users/rdo/get-user.rdo';
import { type UserRequest } from '#src/common/types/user-request.type';
import { User } from '#src/common/decorators/User.decorator';
import { AuthGuard } from '#src/common/decorators/guards/authGuard.decorator';
import { UpdateUserDto } from '#src/core/users/dto/update-user.dto';

@ApiTags('users')
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({ type: [GetUserRdo] })
  @ApiQuery({ name: 'property', description: 'Одно из полей user' })
  @ApiQuery({ name: 'order', description: 'ASC, DESC' })
  @Get()
  async getAllUsers(
    @Query('by') property: string,
    @Query('order') order: string,
  ) {
    const users = await this.userService.find({
      relations: {
        role: true,
        house: true,
      },
      order: { [property]: order },
    });

    return users.map((user) => new GetUserRdo(user));
  }

  @ApiOkResponse({ type: GetUserRdo })
  @Get('/byId/:id')
  async getUser(@Param('id') id: number) {
    return new GetUserRdo(
      await this.userService.findOne(
        {
          where: { id },
          relations: {
            role: true,
            house: true,
          },
        },
        true,
      ),
    );
  }

  @ApiOkResponse({ type: GetUserRdo })
  @ApiHeader({
    name: 'Authorization',
    required: true,
    schema: { format: 'Bearer ${AccessToken}' },
  })
  @AuthGuard()
  @Get('me')
  async getUserMe(@User() user: UserRequest) {
    return new GetUserRdo(
      await this.userService.findOne({
        where: { id: user.id },
        relations: {
          role: true,
          house: true,
        },
      }),
    );
  }

  @ApiOkResponse({ type: GetUserRdo })
  @ApiHeader({
    name: 'Authorization',
    required: true,
    schema: { format: 'Bearer ${AccessToken}' },
  })
  @AuthGuard()
  @Patch()
  async update(
    @User() user: UserRequest,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.updateOne(
      {
        where: { id: user.id },
        relations: { role: true, house: true },
      },
      {
        firstname: updateUserDto.firstname,
        surname: updateUserDto.surname,
        lastname: updateUserDto.lastname,
        login: updateUserDto.login,
        role: updateUserDto.role ? { id: updateUserDto.role } : undefined,
        password: updateUserDto.password,
        house: updateUserDto.houseId
          ? { id: updateUserDto.houseId }
          : undefined,
      },
    );

    return new GetUserRdo(
      await this.userService.findOne({
        where: { id: user.id },
        relations: { role: true, house: { image: true } },
      }),
    );
  }
}
