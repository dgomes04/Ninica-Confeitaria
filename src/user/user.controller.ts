import { Body, Controller, Get, Post } from '@nestjs/common';
import { Res } from '@nestjs/common/decorators';
import { Response } from 'express';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CreateUserDto } from './dto/create-user.dto';
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

  @IsPublic()
  @Get()
  findAll() {
    return this.userService.pegarTudo();
  }
}
