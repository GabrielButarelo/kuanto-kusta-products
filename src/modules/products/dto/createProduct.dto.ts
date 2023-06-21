import { IsNotEmpty } from 'class-validator';
import { ICreateProduct } from '../interfaces/createProduct.interface';

export class CreateProductDto implements ICreateProduct {
  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  price: number;
}
