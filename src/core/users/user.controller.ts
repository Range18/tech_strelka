import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { UserService } from '#src/core/users/user.service';
import { ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetUserRdo } from '#src/core/users/rdo/get-user.rdo';
import { type UserRequest } from '#src/common/types/user-request.type';
import { User } from '#src/common/decorators/User.decorator';
import { AuthGuard } from '#src/common/decorators/guards/authGuard.decorator';
import { UpdateUserDto } from '#src/core/users/dto/update-user.dto';
import { IsNull } from 'typeorm';

@ApiTags('users')
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({ type: [GetUserRdo] })
  @ApiQuery({ name: 'by', description: 'Одно из полей user' })
  @ApiQuery({ name: 'order', description: 'ASC, DESC' })
  @ApiQuery({ name: 'houseId' })
  @Get()
  async getAllUsers(
    @Query('by') property?: string,
    @Query('houseId') houseId?: number | string,
    @Query('order') order?: string,
  ) {
    const users = await this.userService.find({
      where: {
        house: houseId !== 'null' ? { id: Number(houseId) } : IsNull(),
      },
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
  @Patch('me')
  async updateMe(
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

  @ApiOkResponse({ type: GetUserRdo })
  @ApiHeader({
    name: 'Authorization',
    required: true,
    schema: { format: 'Bearer ${AccessToken}' },
  })
  @ApiQuery({ name: 'id' })
  @AuthGuard()
  @Patch()
  async update(@Query('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    await this.userService.updateOne(
      {
        where: { id: id },
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
        where: { id: id },
        relations: { role: true, house: { image: true } },
      }),
    );
  }

  @Patch('removeHouse')
  async removeFromHouse(@Query('id') id: number) {
    const user = await this.userService.findOne({ where: { id } });

    user.house = null;

    return await this.userService.save(user);
  }

  @ApiOkResponse({ type: [GetUserRdo] })
  @AuthGuard()
  @Get('house/rating')
  async getHouseRating(@User() user: UserRequest) {
    const users = await this.userService.getHouseRating(user.id);

    return users.map((user) => new GetUserRdo(user));
  }
}
