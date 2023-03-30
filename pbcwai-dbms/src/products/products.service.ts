import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  // This is the file system path of the JSON file we will use as our database.
  // We require that file to already exist and be readable and writable.
  // We require the user to specify this path so they have full control
  // over where file system changes are made by this application.
  // The application should exit/fail if the user didn't specify the file
  // path, but the app should just return a runtime error and keep going
  // if there is a problem with the actual referred-to file;
  // the data file itself is only read and/or written on API calls that use
  // it, each time an API call is made, and not once per application run.
  private dataFilePath: string;

  constructor(private configService: ConfigService) {
    // Read the value of DATA_FILE_PATH from either the runtime environment
    // or a local ".env" file; throw an exception if the user didn't declare
    // either of those for us; ideally the app would actually shutdown then.
    const maybeDataFilePath = this.configService.get<string>('DATA_FILE_PATH');
    if (!this.isNonEmptyString(maybeDataFilePath)) {
      throw new Error(
        'Environment variable DATA_FILE_PATH must be a non-empty string.');
    }
    this.dataFilePath = (maybeDataFilePath ?? '').trim();
    console.log('ProductsService.constructor():'
      + ' DATA_FILE_PATH is "' + this.dataFilePath + '"');
  }

  private isNonEmptyString(given: any): boolean {
    return (typeof given === 'string') && given.trim() !== '';
  }

  private isProductMaybeSansProductNumber(given: any): boolean {
    if (typeof given !== 'object') {
      return false;
    }
    if (!given.hasOwnProperty('productName')
        || !this.isNonEmptyString(given.productName)
        || !given.hasOwnProperty('scrumMasterName')
        || !this.isNonEmptyString(given.scrumMasterName)
        || !given.hasOwnProperty('productOwnerName')
        || !this.isNonEmptyString(given.productOwnerName)
        || !given.hasOwnProperty('developerNames')
        || !Array.isArray(given.developerNames)
        || !given.hasOwnProperty('startDate')
        || !this.isNonEmptyString(given.startDate)
        || !given.hasOwnProperty('methodology')
        || !this.isNonEmptyString(given.methodology)) {
      return false;
    }
    const developerNames: Array<any> = given.developerNames;
    if (developerNames.length < 1 || developerNames.length > 5
        || !developerNames.every((elem) => this.isNonEmptyString(elem))) {
      return false;
    }
    return true;
  }

  private isProductSansProductNumber(given: any): boolean {
    return this.isProductMaybeSansProductNumber(given)
      && Object.keys(given).length === 6;
  }

  private isProduct(given: any): boolean {
    return this.isProductMaybeSansProductNumber(given)
      && Object.keys(given).length === 7
      && given.hasOwnProperty('productNumber')
      && this.isNonEmptyString(given.productNumber);
  }

  private isArrayOfProduct(given: any): boolean {
    return (Array.isArray(given)
      && given.every((elem) => this.isProduct(elem)));
  }

  private allProductNumbersAreDistinct(products: Array<UpdateProductDto>): boolean {
    const productNumbers = products.map((elem) => elem.productNumber);
    return ((new Set(productNumbers)).size === productNumbers.length);
  }

  private readDataFile(): Array<UpdateProductDto> {
    var dataFileAsText;
    try {
      dataFileAsText = fs.readFileSync(this.dataFilePath, 'utf8');
    }
    catch (e) {
      console.log('ProductsService.readDataFile():'
        + ' failure to read data file as text from "' + this.dataFilePath + '"');
      // This should result in a generic 500 API response.
      throw e;
    }
    var dataFileAsAny;
    try {
      dataFileAsAny = JSON.parse(dataFileAsText);
    }
    catch (e) {
      console.log('ProductsService.readDataFile():'
        + ' failure to parse data file text as JSON from "' + this.dataFilePath + '"');
      // This should result in a generic 500 API response.
      throw e;
    }
    if (!this.isArrayOfProduct(dataFileAsAny)) {
      const msg: string = 'ProductsService.readDataFile():'
        + ' data file is not Array of Product from "' + this.dataFilePath + '"';
      console.log(msg);
      // This should result in a generic 500 API response.
      throw new Error(msg);
    }
    if (!this.allProductNumbersAreDistinct(dataFileAsAny)) {
      const msg: string = 'ProductsService.readDataFile():'
        + ' data file Products not all distinct productNumbers'
        + ' from "' + this.dataFilePath + '"';
      console.log(msg);
      // This should result in a generic 500 API response.
      throw new Error(msg);
    }
    return dataFileAsAny;
  }

  private writeDataFile(products: Array<UpdateProductDto>): void {
    var dataFileAsText;
    try {
      // Serialize pretty-printed with indentations of 2 spaces per level.
      dataFileAsText = JSON.stringify(products, null, 2);
    }
    catch (e) {
      console.log('ProductsService.readDataFile():'
        + ' failure to serialize data file text as JSON to "' + this.dataFilePath + '"');
      // This should result in a generic 500 API response.
      throw e;
    }
    try {
      fs.writeFileSync(this.dataFilePath, dataFileAsText, 'utf8');
    }
    catch (e) {
      console.log('ProductsService.readDataFile():'
        + ' failure to write data file as text to "' + this.dataFilePath + '"');
      // This should result in a generic 500 API response.
      throw e;
    }
  }

  private maybeIndexOfMatchingProduct(
      products: Array<UpdateProductDto>, productNumber: string)
      : number {
    return products.findIndex((elem) => elem.productNumber === productNumber);
  }

  private productAtIndex(products: Array<UpdateProductDto>, index: number)
      : UpdateProductDto {
    // We assume productAtIndex() is called exclusively on inputs
    // for which maybeIndexOfMatchingProduct() had a successful find.
    // The "?? new UpdateProductDto()" is only here because strict
    // TypeScript would complain about trying to assign X|undefined to X.
    return products.at(index) ?? new UpdateProductDto();
  }

  private generateDistinctProductNumber(products: Array<UpdateProductDto>): string {
    // We will use a simple generator algorithm, that takes the rounded
    // result of multiplying the current UNIX timestamp in milliseconds
    // by a pseudo-random number, then modulo 2^16 so its easier to read,
    // to generate a productNumber.
    // As a guard for the tiny possibility of a collision with
    // an existing productNumber, in the event of a collision we will
    // append an "x" repeatedly until there isn't a collision.
    var productNumber: string
      = (Math.floor(Date.now() * Math.random()) % (2**16)).toString();
    while (this.maybeIndexOfMatchingProduct(products, productNumber) !== -1) {
      productNumber = productNumber + 'x';
    }
    return productNumber;
  }

  createOne(createProductDto: CreateProductDto) {
    if (!this.isProductSansProductNumber(createProductDto)) {
      throw new BadRequestException(
        "request body doesn't match the format of a Product sans productNumber");
    }
    const products: Array<UpdateProductDto> = this.readDataFile();
    const product: UpdateProductDto = {
      "productNumber": this.generateDistinctProductNumber(products),
      "productName": createProductDto.productName,
      "scrumMasterName": createProductDto.scrumMasterName,
      "productOwnerName": createProductDto.productOwnerName,
      "developerNames": createProductDto.developerNames,
      "startDate": createProductDto.startDate,
      "methodology": createProductDto.methodology,
    };
    products.push(product);
    this.writeDataFile(products);
  }

  fetchAll(): Array<UpdateProductDto> {
    return this.readDataFile();
  }

  fetchOne(productNumber: string): UpdateProductDto {
    if (!this.isNonEmptyString(productNumber)) {
      throw new BadRequestException(
        "productNumber (ignoring spaces) isn't a non-empty string");
    }
    const products: Array<UpdateProductDto> = this.readDataFile();
    const maybeIndexOfMatchingProduct
      = this.maybeIndexOfMatchingProduct(products, productNumber);
    if (maybeIndexOfMatchingProduct === -1) {
      throw new NotFoundException(
        "no Product found matching given productNumber");
    }
    return this.productAtIndex(products, maybeIndexOfMatchingProduct);
  }

  updateOne(productNumber: string, updateProductDto: UpdateProductDto) {
    if (!this.isNonEmptyString(productNumber)) {
      throw new BadRequestException(
        "productNumber (ignoring spaces) isn't a non-empty string");
    }
    if (!this.isProduct(updateProductDto)) {
      throw new BadRequestException(
        "request body doesn't match the format of a Product");
    }
    if (updateProductDto.productNumber !== productNumber) {
      throw new BadRequestException(
        "productNumbers in url and request body don't match");
    }
    const products: Array<UpdateProductDto> = this.readDataFile();
    const maybeIndexOfMatchingProduct
      = this.maybeIndexOfMatchingProduct(products, productNumber);
    if (maybeIndexOfMatchingProduct === -1) {
      throw new NotFoundException(
        "no Product found matching given productNumber");
    }
    products.splice(maybeIndexOfMatchingProduct, 1, updateProductDto);
    this.writeDataFile(products);
  }

  removeOne(productNumber: string) {
    if (!this.isNonEmptyString(productNumber)) {
      throw new BadRequestException(
        "productNumber (ignoring spaces) isn't a non-empty string");
    }
    const products: Array<UpdateProductDto> = this.readDataFile();
    const maybeIndexOfMatchingProduct
      = this.maybeIndexOfMatchingProduct(products, productNumber);
    if (maybeIndexOfMatchingProduct === -1) {
      throw new NotFoundException(
        "no Product found matching given productNumber");
    }
    products.splice(maybeIndexOfMatchingProduct, 1);
    this.writeDataFile(products);
  }
}
