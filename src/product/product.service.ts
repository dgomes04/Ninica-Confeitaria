import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthRequest } from 'src/auth/models/AuthRequest';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Produtos } from './entities/product.entity';
@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  //
  async create(produto: CreateProductDto, req: AuthRequest): Promise<Produtos> {
    if (req.user.admin) {
      const data: Prisma.ProductsCreateInput = {
        ...produto,
      };

      const createdProduct = await this.prisma.products.create({ data });
      return createdProduct;
    }

    throw new Error();
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
      return await this.prisma.products.update({
        data: {
          active: updatedProduct?.active,
          description: updatedProduct?.description,
          name: updatedProduct?.name,
          options: updatedProduct?.options,
          price: updatedProduct?.price,
          categoryId: updatedProduct?.categoryId,
        },
        where: {
          id,
        },
      });
    }
  }

  async remove(id: number, req: AuthRequest) {
    if (req.user.admin) {
      return await this.prisma.products.delete({
        where: { id },
      });
    }
  }
}
