import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  createOne(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  fetchAll() {
    return [
      {
        productNumber: '12345',
      },
      {
        productNumber: '6789',
      },
    ];
    return `This action returns all products`;
  }

  fetchOne(productNumber: string): UpdateProductDto {
    return {
      productNumber: '12345',
    };
  }

  updateOne(productNumber: string, updateProductDto: UpdateProductDto) {
    return `This action updates a ${productNumber} product`;
  }

  removeOne(productNumber: string) {
    return `This action removes a ${productNumber} product`;
  }
}
