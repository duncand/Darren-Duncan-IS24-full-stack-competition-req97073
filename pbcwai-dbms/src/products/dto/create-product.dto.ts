import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
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
