import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductDTO } from './DTO/product.dto';

@Injectable()
export class ProductService {
  product = [
    {
      id: 1,
      name: 'tomato',
      price: 3,
      category: 'Food',
      description: 'tomato',
    },
    {
      id: 2,
      name: 'toster',
      price: 50,
      category: 'Electronics',
      description: 'toster',
    },
    {
      id: 3,
      name: 'blender',
      price: 100,
      category: 'Electronics',
      description: 'blender',
    },
    {
      id: 4,
      name: 'tv',
      price: 1000,
      category: 'Electronics',
      description: 'tv',
    },
    {
      id: 5,
      name: 'camera',
      price: 1500,
      category: 'Electronics',
      description: 'camera',
    },
    {
      id: 6,
      name: 'phone',
      price: 3000,
      category: 'Electronics',
      description: 'phone',
    },
  ];

  getAllProduct() {
    return this.product;
  }

  getProductById(id: number) {
    const product = this.product.find((el) => el.id === Number(id));
    if (!product) throw new HttpException('not found', HttpStatus.NOT_FOUND);
    return product;
  }

  createProduct(body: ProductDTO) {
    const lastId = this.product[this.product.length - 1]?.id || 0;
    const newObj = {
      id: lastId + 1,
      name: body.name,
      price: body.price,
      category: body.category,
      description: body.description,
    };

    this.product.push(newObj);
    return newObj;
  }

  updateProduct(id: number, body: ProductDTO) {
    const index = this.product.findIndex((el) => el.id === Number(id));

    if (index === -1)
      throw new HttpException('not found', HttpStatus.NOT_FOUND);

    this.product[index] = {
      ...this.product[index],
      ...body,
    };

    return this.product[index];
  }

  deleteProduct(id: number) {
    const index = this.product.findIndex((el) => el.id === Number(id));

    if (index === -1)
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    const deleteproduct = this.product.splice(index, 1);

    return deleteproduct;
  }
}
