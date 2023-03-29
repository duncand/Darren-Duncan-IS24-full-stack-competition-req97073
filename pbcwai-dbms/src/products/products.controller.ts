import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':productNumber')
  findOne(@Param('productNumber') productNumber: string) {
    return this.productsService.findOne(productNumber);
  }

  @Put(':productNumber')
  update(@Param('productNumber') productNumber: string,
      @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(productNumber, updateProductDto);
  }

  @Delete(':productNumber')
  remove(@Param('productNumber') productNumber: string) {
    return this.productsService.remove(productNumber);
  }
}
