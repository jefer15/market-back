import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll() {
    return this.productRepository.find();
  }

  async findTop3(): Promise<any[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .leftJoin('product.order_details', 'order_detail')
      .select([
        'product.id AS id',
        'product.name AS name',
        'product.price AS price',
        'SUM(order_detail.quantity) AS total_quantity',
      ])
      .groupBy('product.id, product.name, product.price')
      .orderBy('total_quantity', 'DESC')
      .limit(3)
      .getRawMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
