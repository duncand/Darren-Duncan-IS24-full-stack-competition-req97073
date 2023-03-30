import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
