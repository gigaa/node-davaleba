import {
  Controller,
  Req,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IsAdmin, IsEditor, IsViewer } from 'src/guards/role.guard';
import { HasUSerIDGuard } from 'src/guards/hasUserID.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @UseGuards(IsEditor)
  @UseGuards(HasUSerIDGuard)
  @Post()
  create(@Req() request, @Body() createProductDto: CreateProductDto) {
    const userId = request.userId;
    return this.productsService.create(userId, createProductDto);
  }

  @UseGuards(IsViewer)
  @Get()
  findAll() {
    return this.productsService.findAll().populate({ path: 'user' });
  }

  @UseGuards(IsViewer)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id as any);
  }

  @UseGuards(IsEditor)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id as any, updateProductDto);
  }

  @UseGuards(IsAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id as any);
  }
}
