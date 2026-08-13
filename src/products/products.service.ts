import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, productSchema } from './schema/products.schema';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const newProduct = await this.productModel.create(createProductDto);
    return newProduct;
  }

  async findAll() {
    return this.productModel.find();
  }

  async findOne(id: number) {
    if (!isValidObjectId(id)) throw new BadRequestException();
    const findProductById = await this.productModel.findById(id);
    if (!findProductById) throw new NotFoundException();
    return findProductById;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    console.log({ id });

    if (!isValidObjectId(id)) throw new BadRequestException();
    const updateProductById = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true },
    );
    if (!updateProductById) throw new NotFoundException();
    return updateProductById;
  }

  async remove(id: number) {
    if (!isValidObjectId(id)) throw new BadRequestException();
    const deletedProductByID = await this.productModel.findByIdAndDelete(id);
    if (!deletedProductByID) throw new NotFoundException();
    return deletedProductByID;
  }
}
