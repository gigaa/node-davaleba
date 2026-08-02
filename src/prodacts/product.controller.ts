import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Query,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDTO } from './DTO/product.dto';

@Controller()
export class ProductController {
  constructor(private readonly ProductService: ProductService) {}

  @Get('/prodact')
  getAllProdact(@Query() query) {
    return this.ProductService.getAllProduct(query);
  }

  @Get('/prodact/:id')
  getProdactById(@Param('id') id: number) {
    return this.ProductService.getProductById(id);
  }

  @Post('/prodact')
  createUser(@Body() body: ProductDTO) {
    console.log(body);
    return this.ProductService.createProduct(body);
  }

  @Put('/prodact/:id')
  updateProdact(@Body() body: ProductDTO, @Param('id') id: number) {
    return this.ProductService.updateProduct(id, body);
  }

  @Delete('/prodact/:id')
  deleteProdact(@Param('id') id: number, @Headers() headers) {
    return this.ProductService.deleteProduct(id, headers);
  }
}
