import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async pegarTudo() {
    return this.prisma.users.findMany();
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const alreadyExists = await this.findByEmail(createUserDto.email);

    if (alreadyExists) {
      throw new Error('This user already exists');
    }
    const data: Prisma.UsersCreateInput = {
      id: uuidV4(),
      ...createUserDto,
      createdAt: new Date(),
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.prisma.users.create({ data });

    return {
      ...createdUser,
      password: undefined,
      admin: undefined,
    };
  }

  findByEmail(email: string) {
    return this.prisma.users.findUnique({ where: { email } });
  }
}
