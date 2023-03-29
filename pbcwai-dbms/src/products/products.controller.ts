import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new Product with a generated productNumber'
  })
  @ApiCreatedResponse({
    description: 'Created a new Product with a generated productNumber',
  })
  createOne(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createOne(createProductDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Fetch a list of all existing Products'
  })
  @ApiOkResponse({
    description: 'Fetched a list of all existing Products',
  })
  fetchAll() {
    return this.productsService.fetchAll();
  }

  @Get(':productNumber')
  @ApiParam({ name: 'productNumber', type: String, required: true })
  @ApiOperation({
    summary: 'Fetch an existing Product matching given productNumber'
  })
  @ApiOkResponse({
    description: 'Fetched an existing Product matching given productNumber'
  })
  @ApiNotFoundResponse({
    description: 'No Product found matching given productNumber'
  })
  fetchOne(@Param('productNumber') productNumber: string): UpdateProductDto {
    return this.productsService.fetchOne(productNumber);
  }

  @Put(':productNumber')
  @ApiParam({ name: 'productNumber', type: String, required: true })
  @ApiOperation({
    summary: 'Update an existing Product matching given productNumber'
  })
  @ApiOkResponse({
    description: 'Updated an existing Product matching given productNumber'
  })
  @ApiNotFoundResponse({
    description: 'No Product found matching given productNumber'
  })
  updateOne(@Param('productNumber') productNumber: string,
      @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.updateOne(productNumber, updateProductDto);
  }

  @Delete(':productNumber')
  @ApiParam({ name: 'productNumber', type: String, required: true })
  @ApiOperation({
    summary: 'Remove an existing Product matching given productNumber'
  })
  @ApiOkResponse({
    description: 'Removed an existing Product matching given productNumber'
  })
  @ApiNotFoundResponse({
    description: 'No Product found matching given productNumber'
  })
  removeOne(@Param('productNumber') productNumber: string) {
    return this.productsService.removeOne(productNumber);
  }
}
