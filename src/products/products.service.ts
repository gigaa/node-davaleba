import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  products = [
    {
      id: 1,
      title: 'Wireless Keyboard',
      description: 'Slim Bluetooth keyboard for laptops',
      price: 89.9,
      stock: 12,
      category: 'electronics',
    },
    {
      id: 2,
      title: 'toster',
      description: 'toster desc',
      price: 100,
      stock: 33,
      category: 'electronics',
    },
    {
      id: 3,
      title: 'tv',
      description: 'tv desc',
      price: 500,
      stock: 50,
      category: 'electronics',
    },
    {
      id: 4,
      title: 'blender',
      description: 'blender desc',
      price: 1000,
      stock: 100,
      category: 'electronics',
    },
    {
      id: 5,
      title: 'mouse',
      description: 'mouse desc',
      price: 100,
      stock: 10,
      category: 'electronics',
    },
  ];

  create(createProductDto: CreateProductDto) {
    const lsatId = this.products[this.products.length - 1]?.id || 0;

    const newProduct = {
      id: lsatId + 1,
      title: createProductDto.title,
      description: createProductDto.description,
      price: createProductDto.price,
      stock: createProductDto.stock,
      category: createProductDto.category,
    };

    this.products.push(newProduct);

    return newProduct;
  }

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((el) => el.id == id);
    if (!product) throw new NotFoundException();
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const index = this.products.findIndex((el) => el.id === id);
    if (index === -1) throw new BadGatewayException();

    this.products[index] = {
      ...this.products[index],
      title: updateProductDto.title || this.products[index].title,
      description:
        updateProductDto.description || this.products[index].description,
      price: updateProductDto.price || this.products[index].price,
      stock: updateProductDto.stock || this.products[index].stock,
      category: updateProductDto.category || this.products[index].category,
    };
    return this.products[index];
  }

  remove(id: number) {
    const index = this.products.findIndex((el) => el.id === id);
    if (index === -1) throw new BadGatewayException();
    const deleteProducts = this.products.splice(index, 1);
    return deleteProducts;
  }
}
