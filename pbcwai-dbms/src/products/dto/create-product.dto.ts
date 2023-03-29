export class CreateProductDto {
  productName: string;
  scrumMasterName: string;
  productOwnerName: string;
  developerNames: Array<string>;
  startDate: string;
  methodology: string;
}
