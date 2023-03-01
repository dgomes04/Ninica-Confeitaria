import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from 'src/product/entities/product.entity';
import { v4 as uuidV4 } from 'uuid';
import { CreateCartDto } from './dto/create-cart.dto';
import { RemoveCartDto } from './dto/remove-cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly prismaService: PrismaService) {}
  async create({ productId, ...createCartDto }: CreateCartDto) {
    //verificando se existe o produto
    const produtoAtivo = await this.prismaService.products.findFirstOrThrow({
      where: { id: productId },
      select: {
        active: true,
      },
    });
    if (produtoAtivo) {
      const Carrinho = await this.prismaService.carts.findFirst({
        where: { userId: createCartDto.userId },
      });

      if (Carrinho.finished) {
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
        const createdCart = await this.adicionarProdutoQuandoCriaCart(
          product,
          id,
        );
        return createdCart;
      }

      throw new Error('Finalize the cart first');
    }
    throw new Error('This product is not active');
  }

  async adicionarProdutoQuandoCriaCart(produto: Product, idCart: string) {
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
  }

  async adicionarProdutoPorId(produtoId: number, cartId: string) {
    const { products } = await this.prismaService.carts.findFirstOrThrow({
      where: { id: cartId },
      select: {
        products: {
          where: {
            active: true,
          },
        },
        finished: false,
      },
    });
    products.forEach((val) => {
      if (val.id == produtoId) {
        throw new Error('Product already on cart');
      }
    });
    const produto = await this.prismaService.products.findFirst({
      where: { id: produtoId },
    });

    if (produto.active) {
      const produtoAdicionado = await this.prismaService.carts.update({
        where: { id: cartId },
        data: {
          products: {
            connectOrCreate: {
              create: produto,
              where: { id: produto.id },
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
    throw new Error('This product is not active');
  }

  async findAll(id: string) {
    const user = await this.prismaService.users.findFirstOrThrow({
      where: { id },
      select: {
        Cart: {
          where: {
            canceled: false,
          },
        },
      },
    });
    return user;
  }
  async findCurrentCart(id: string) {
    const user = await this.prismaService.users.findFirstOrThrow({
      where: { id },
      select: {
        Cart: {
          where: {
            canceled: false,
            finished: false,
            payed: false,
          },
          select: {
            id: true,
          },
        },
      },
    });
    return user;
  }

  async findOne(id: string) {
    const cart = await this.prismaService.carts.findFirstOrThrow({
      where: { id },
      select: {
        products: true,
      },
    });

    return cart;
  }

  async removeProduct({ productId, cartId }: RemoveCartDto) {
    const possuiEsseProduto = await this.prismaService.carts.findFirst({
      where: { id: cartId },
      select: {
        products: {
          where: { id: productId },
        },
      },
    });
    const carrinhoFinalizado = await this.prismaService.carts.findFirstOrThrow({
      where: { id: cartId },
      select: { finished: true },
    });

    if (!carrinhoFinalizado.finished) {
      if (possuiEsseProduto.products.length > 0) {
        const removedProductFromCart = await this.prismaService.carts.update({
          where: { id: cartId },
          data: {
            products: {
              disconnect: {
                id: productId,
              },
            },
          },
          select: {
            products: true,
          },
        });
        if (removedProductFromCart.products.length == 0) {
          await this.prismaService.carts.update({
            where: { id: cartId },
            data: {
              finished: true,
              canceled: true,
            },
          });
          return {
            Message: `This cart(${cartId}) was finished`,
          };
        }
        return removedProductFromCart;
      }
      throw new Error('This product is already removed');
    }
    throw new Error(`This cart(${cartId}) is already finished`);
  }
}
