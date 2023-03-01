import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthRequest } from 'src/auth/models/AuthRequest';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  //
  async create(produto: CreateProductDto, req: AuthRequest): Promise<Product> {
    if (req.user.admin) {
      const data: Prisma.ProductsCreateInput = {
        ...produto,
      };
      const createdProduct = await this.prisma.products.create({ data });
      return createdProduct;
    }
    throw new Error('Only Administrators are able to access this endpoint');
  }

  async findAll() {
    return await this.prisma.products.findMany();
  }

  async findOne(id: number) {
    console.log(id);
    return await this.prisma.products.findFirstOrThrow({
      where: { id },
    });
  }

  async update(id: number, updatedProduct: UpdateProductDto, req: AuthRequest) {
    if (req.user.admin) {
      const ExisteProduto = await this.prisma.products.findFirstOrThrow({
        where: { id },
      });
      if (ExisteProduto) {
        const data = updatedProduct;
        return await this.prisma.products.update({
          data,
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
      const ExisteProduto = await this.prisma.products.findFirstOrThrow({
        where: { id },
      });
      if (ExisteProduto) {
        return await this.prisma.products.delete({
          where: { id },
        });
      }
    }
    throw new Error('Only Administrators are able to access this endpoint');
  }
}
