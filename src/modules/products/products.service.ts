import { Model } from 'mongoose';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dto/createProduct.dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCT_MODEL')
    private readonly productModel: Model<Product>,
  ) {}

  async createProduct(data: CreateProductDto) {
    try {
      const productExists = await this.productModel
        .find({
          productId: data.productId,
        })
        .exec();

      if (productExists.length)
        return new HttpException(
          'Product Id already exists',
          HttpStatus.NOT_ACCEPTABLE,
        );

      return await this.productModel.create({
        productId: data.productId,
        price: data.price,
      });
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async listAllProducts() {
    try {
      return await this.productModel.find().exec();
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
