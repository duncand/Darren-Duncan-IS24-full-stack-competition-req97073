import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({
    type: String,
    minLength: 1,
    required: true,
    example: '12345',
  })
  productNumber: string;

  // The remaining properties below this line are exact clones of those
  // declared in CreateProductDto.  An earlier version of this class
  // instead had these:
  //   import { PartialType } from '@nestjs/mapped-types';
  //   export class UpdateProductDto extends PartialType(CreateProductDto)
  // However, this was changed to the current method so that Swagger can
  // properly pick up on all the members of UpdateProductDto.

  @ApiProperty({
    type: String,
    minLength: 1,
    required: true,
    example: 'The Project With No Name',
  })
  productName: string;

  @ApiProperty({
    type: String,
    minLength: 1,
    required: true,
    example: 'John Doe',
  })
  scrumMasterName: string;

  @ApiProperty({
    type: String,
    minLength: 1,
    required: true,
    example: 'Jane Doe',
  })
  productOwnerName: string;

  @ApiProperty({
    type: Array,
    minLength: 1,
    required: true,
    example: ['Larry', 'Curly', 'Moe'],
  })
  developerNames: Array<string>;

  @ApiProperty({
    type: String,
    minLength: 1,
    required: true,
    example: '2023/03/31',
  })
  startDate: string;

  @ApiProperty({
    type: String,
    minLength: 1,
    required: true,
    example: 'Waterfall',
  })
  methodology: string;
}
