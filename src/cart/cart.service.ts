import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';
import { v4 as uuidV4 } from 'uuid';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class CartService {
  constructor(private readonly prismaService: PrismaService) {}
  async create({ productId, ...createCartDto }: CreateCartDto) {
    //verificando se existe o produto
    await this.prismaService.products.findFirstOrThrow({
      where: { id: productId },
      select: {
        id: true,
      },
    });

    const Carrinho = await this.prismaService.carts.findFirst({
      where: { userId: createCartDto.userId },
    });

    // if (Carrinho) {
    const id = uuidV4();
    await this.prismaService.carts.create({
      data: {
        id,
        ...createCartDto,
        createdAt: new Date(),
      },
    });
    const product = await this.prismaService.products.findFirst({
      where: { id: productId },
    });
    const createdCart = await this.adicionarProduto(product, id);

    return createdCart;
    //}
    throw new Error('Finalize the cart first');
  }

  async adicionarProduto(produto: Product | number, idCart: string) {
    const produtoTipo = typeof produto;
    if (produtoTipo == 'object') {
      const { id } = produto as Product;
      const produtoAdicionado = await this.prismaService.carts.update({
        where: { id: idCart },
        data: {
          products: {
            connectOrCreate: {
              create: produto as Product,
              where: { id },
            },
          },
        },
        select: {
          id: true,
          payment_type: true,
          finished: true,
          userId: true,
        },
      });
      return produtoAdicionado;
    }
    const { id } = await this.prismaService.products.findFirst({
      where: { id: produto as number },
      select: {
        id: true,
      },
    });
    const produtoComoProduto = await this.prismaService.products.findFirst({
      where: { id: produto as number },
    });

    const produtoAdicionado = await this.prismaService.carts.update({
      where: { id: idCart },
      data: {
        products: {
          connectOrCreate: {
            create: produtoComoProduto,
            where: { id: produtoComoProduto.id },
          },
        },
      },
      select: {
        id: true,
        payment_type: true,
        finished: true,
        userId: true,
      },
    });
    return produtoAdicionado;
  }

  async findAll() {
    return `This action returns all cart`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  async remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
