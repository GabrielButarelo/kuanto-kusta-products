import { EventPattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { Inject } from '@nestjs/common';
import { CreateProductDto } from './dto/createProduct.dto';

export class ProductsController {
  constructor(
    @Inject(ProductsService)
    private readonly productsService: ProductsService,
  ) {}

  @EventPattern('create_product')
  async createProduct(@Payload() data: CreateProductDto) {
    return await this.productsService.createProduct(data);
  }

  @EventPattern('list_all_products')
  async listAllProducts() {
    return this.productsService.listAllProducts();
  }
}
