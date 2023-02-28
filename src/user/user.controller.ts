import { Body, Controller, Get, Post } from '@nestjs/common';
import { Delete, Param, Patch, Res } from '@nestjs/common/decorators';
import { Response } from 'express';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const createdUser = await this.userService.create(createUserDto);
      res.status(201).send({
        ...createdUser,
        createdAt: undefined,
        editedAt: undefined,
        deletedAt: undefined,
        confirmed: undefined,
        deleted: undefined,
      });
    } catch (error) {
      res.status(401).send({
        StatusCode: 401,
        Message: error.message,
      });
    }
  }
  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto, @Res() res) {
    try {
      const updatedUser = await this.userService.update(updateUserDto);
      res.status(200).send({ updatedUser });
    } catch (error) {
      res.status(401).send({
        StatusCode: 401,
        Message: error.message,
      });
    }
  }

  @Delete('')
  async delete(@Body() DeleteUserDto: DeleteUserDto, @Res() res) {
    try {
      const deletedUser = await this.userService.delete(DeleteUserDto);
      res.status(200).send({ deletedUser });
    } catch (error) {
      res.status(401).send({
        StatusCode: 401,
        Message: error.message,
      });
    }
  }

  @Get('me')
  getMe(@CurrentUser() user: User) {
    return user;
  }

  @IsPublic()
  @Get()
  findAll() {
    return this.userService.pegarTudo();
  }
}
