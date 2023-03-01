import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import { AuthRequest } from 'src/auth/models/AuthRequest';
import { CartService } from './cart.service';
import { AddCartDto } from './dto/add-cart.dto';
import { CreateCartDto } from './dto/create-cart.dto';
import { RemoveCartDto } from './dto/remove-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async create(@Body() createCartDto: CreateCartDto, @Res() res) {
    try {
      const createdCart = await this.cartService.create(createCartDto);

      res.status(201).send({ createdCart });
    } catch (error) {
      res.status(401).send({
        StatusCode: 401,
        Message: error.message,
      });
    }
  }
  @Post('add')
  async add(@Body() { id, cartId }: AddCartDto, @Res() res) {
    try {
      const AddedProduct = await this.cartService.adicionarProdutoPorId(
        id,
        cartId,
      );
      res.status(200).send({ AddedProduct });
    } catch (error) {
      res.status(401).send({
        StatusCode: 401,
        Message: error.message,
      });
    }
  }

  @Get()
  async findAll(@Res() res, @Req() req: AuthRequest) {
    try {
      const compras = await this.cartService.findAll(req.user.id);

      res.status(200).send({ compras });
    } catch (error) {
      res.status(401).send({
        StatusCode: 401,
        Message: error.message,
      });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    try {
      const compras = await this.cartService.findOne(id);

      res.status(200).send({ compras });
    } catch (error) {
      res.status(401).send({
        StatusCode: 401,
        Message: error.message,
      });
    }
  }
  @Get('/current/:id')
  async findCurrentCart(@Param('id') id: string, @Res() res) {
    try {
      const currentCart = await this.cartService.findCurrentCart(id);

      res.status(200).send({ currentCart });
    } catch (error) {
      res.status(401).send({
        StatusCode: 401,
        Message: error.message,
      });
    }
  }

  @Patch('remove')
  async remover(@Body() updateCartDto: RemoveCartDto, @Res() res) {
    try {
      const removedProduct = await this.cartService.removeProduct(
        updateCartDto,
      );
      res.status(200).send({ removedProduct });
    } catch (error) {
      res.status(401).send({
        StatusCode: 401,
        Message: error.message,
      });
    }
    return;
  }
}
