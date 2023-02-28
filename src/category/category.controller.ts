import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categoria')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Req() req,
    @Res() res,
  ) {
    try {
      const createdCategory = await this.categoryService.create(
        createCategoryDto,
        req,
      );
      res.status(201).send({ createdCategory });
    } catch (error) {
      res.status(401).send({
        StatusCode: 401,
        Message: 'Only Administrators are able to access this endpoint',
      });
    }
  }
  @IsPublic()
  @Get()
  async findAll(@Res() res) {
    try {
      const categorias = await this.categoryService.findAll();
      res.status(200).send({ categorias });
    } catch (error) {
      res.status(401).send({
        StatusCode: 401,
        Message: error.message,
      });
    }
  }
  @IsPublic()
  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res) {
    try {
      const categoria = await this.categoryService.findOne(id);
      res.status(200).send({ categoria });
    } catch (error) {
      res.status(401).send({
        StatusCode: 401,
        Message: error.message,
      });
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Req() req,
    @Res() res,
  ) {
    try {
      const updatedCategory = await this.categoryService.update(
        id,
        updateCategoryDto,
        req,
      );
      res.status(200).send({ updatedCategory });
    } catch (error) {
      res.status(401).send({
        StatusCode: 401,
        Message: error.message,
      });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Req() req, @Res() res) {
    try {
      const removedCategory = await this.categoryService.remove(id, req);
      res.status(200).send({ removedCategory });
    } catch (error) {
      res.status(401).send({
        StatusCode: 401,
        Message: error.message,
      });
    }
  }
}
