import { Injectable } from '@nestjs/common';
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
    if (typeof maybeDataFilePath !== 'string') {
      throw new Error('Environment variable DATA_FILE_PATH must be a non-empty string.');
    }
    this.dataFilePath = maybeDataFilePath.trim();
    if (this.dataFilePath === '') {
      throw new Error('Environment variable DATA_FILE_PATH must be a non-empty string.');
    }
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
    if (!Array.isArray(given)) {
      return false;
    }
    if (!given.every((elem) => this.isProduct(elem))) {
      return false;
    }
    const productNumbers = given.map((elem) => elem.productNumber);
    if ((new Set(productNumbers)).size !== productNumbers.length) {
      return false;
    }
    return true;
  }

  private readDataFile(): Array<UpdateProductDto> {
    var dataFileAsText;
    try {
      dataFileAsText = fs.readFileSync(this.dataFilePath, 'utf8');
      console.log('ProductsService.readDataFile():'
        + ' successful read of data file as text from "' + this.dataFilePath + '"');
    }
    catch (e) {
      console.log('ProductsService.readDataFile():'
        + ' failure to read data file as text from "' + this.dataFilePath + '"');
      // For now just propagate out and produce generic 500 API response.
      throw e;
    }
    var dataFileAsAny;
    try {
      dataFileAsAny = JSON.parse(dataFileAsText);
      console.log('ProductsService.readDataFile():'
        + ' successful parse of data file as JSON from "' + this.dataFilePath + '"');
    }
    catch (e) {
      console.log('ProductsService.readDataFile():'
        + ' failure to parse data file text as JSON from "' + this.dataFilePath + '"');
      // For now just propagate out and produce generic 500 API response.
      throw e;
    }
    if (!this.isArrayOfProduct(dataFileAsAny)) {
      const msg: string = 'ProductsService.readDataFile():'
        + ' data file is not Array of Product from "' + this.dataFilePath + '"';
      console.log(msg);
      // For now just propagate out and produce generic 500 API response.
      throw new Error(msg);
    }
    else {
      console.log('ProductsService.readDataFile():'
        + ' data file is an Array of Product from "' + this.dataFilePath + '"');
    }
    return dataFileAsAny;
  }

  createOne(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  fetchAll(): Array<UpdateProductDto> {
    return this.readDataFile();
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
