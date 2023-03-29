import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(productNumber: string) {
    return `This action returns a ${productNumber} product`;
  }

  update(productNumber: string, updateProductDto: UpdateProductDto) {
    return `This action updates a ${productNumber} product`;
  }

  remove(productNumber: string) {
    return `This action removes a ${productNumber} product`;
  }
}
