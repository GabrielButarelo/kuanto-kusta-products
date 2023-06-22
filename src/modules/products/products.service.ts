import { Model } from 'mongoose';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dto/createProduct.dto';
import { ICreateProductResponse } from './interfaces/createProductResponse.interface';
import { IListAllProductsResponse } from './interfaces/listAllProducts.interface';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCT_MODEL')
    private readonly productModel: Model<Product>,
  ) {}

  async createProduct(
    data: CreateProductDto,
  ): Promise<InternalServerErrorException | ICreateProductResponse> {
    try {
      const productExists = await this.productModel
        .find({
          productId: data.productId,
        })
        .exec();

      if (productExists.length)
        throw new BadRequestException('Product id already exists');

      await this.productModel.create({
        productId: data.productId,
        price: data.price,
      });

      return {
        message: 'Product created!',
      };
    } catch (error) {
      return new InternalServerErrorException(error.message);
    }
  }

  async listAllProducts(): Promise<
    InternalServerErrorException | IListAllProductsResponse[]
  > {
    try {
      const allProducts = await this.productModel.find().exec();

      const products = allProducts.map((product) => {
        return {
          productId: product.productId,
          price: product.price,
        };
      });

      return products;
    } catch (error) {
      return new InternalServerErrorException(error.message);
    }
  }
}
