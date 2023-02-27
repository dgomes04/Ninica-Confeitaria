import { Injectable } from '@nestjs/common';
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
      const createdProduct = await this.prisma.produtos.create({
        data: {
          description: produto.description,
          name: produto.name,
          options: produto?.options,
          price: produto.price,
        },
      });
      console.log(createdProduct);
      return createdProduct;
    }

    throw new Error();
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
