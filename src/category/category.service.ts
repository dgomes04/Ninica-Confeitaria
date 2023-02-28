import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthRequest } from 'src/auth/models/AuthRequest';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto, req: AuthRequest) {
    if (req.user.admin) {
      const data: Prisma.CategoriesCreateInput = {
        ...createCategoryDto,
      };

      const createdCategory = await this.prismaService.categories.create({
        data,
      });
      return createdCategory;
    }
    throw new Error();
  }

  async findAll() {
    return await this.prismaService.categories.findMany({
      select: {
        id: true,
        type: true,
        active: true,
        Produtos: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.categories.findFirstOrThrow({
      where: { id },
      select: {
        id: true,
        type: true,
        active: true,
        Produtos: true,
      },
    });
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
    req: AuthRequest,
  ) {
    if (req.user.admin) {
      const ExisteCategoria =
        await this.prismaService.categories.findFirstOrThrow({ where: { id } });

      if (ExisteCategoria) {
        return await this.prismaService.categories.update({
          data: {
            active: updateCategoryDto?.active,
            type: updateCategoryDto?.type,
          },
          where: {
            id,
          },
        });
      }
    }
    throw new Error('Only Administrators are able to access this endpoint');
  }

  async remove(id: number, req: AuthRequest) {
    if (req.user.admin) {
      const deletedCategory = await this.prismaService.categories.delete({
        where: { id },
      });
      return deletedCategory;
    }
    throw new Error('Only Administrators are able to access this endpoint');
  }
}
