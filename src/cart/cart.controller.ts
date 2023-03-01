import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddCartDto } from './dto/add-cart.dto';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

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
      const AddedProduct = await this.cartService.adicionarProduto(id, cartId);
      res.status(200).send({ AddedProduct });
    } catch (error) {
      console.log(error);
      res.status(401).send({
        StatusCode: 401,
        Message: error.message,
      });
    }
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
