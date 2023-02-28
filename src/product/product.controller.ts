import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @Req() req,
    @Res() res: Response,
  ) {
    try {
      const createdProduct = await this.productService.create(
        createProductDto,
        req,
      );

      return res.status(201).send(createdProduct);
    } catch (error) {
      return res.status(401).send({
        StatusCode: 401,
        Message: 'Only Administrators are able to access this endpoint',
      });
    }
  }

  @IsPublic()
  @Get()
  async findAll() {
    return await this.productService.findAll();
  }

  @IsPublic()
  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res: Response) {
    try {
      const product = await this.productService.findOne(id);

      res.status(200).send({ product });
    } catch (error) {
      res.status(404).send({
        StatusCode: 404,
        Message: error.message,
      });
    }
  }
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
    @Req() req,
  ) {
    return {
      UpdatedProduct: await this.productService.update(
        id,
        updateProductDto,
        req,
      ),
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Req() req) {
    return { DeletedProduct: await this.productService.remove(id, req) };
  }
}
