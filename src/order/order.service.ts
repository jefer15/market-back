import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderDetail } from 'src/order-detail/entities/order-detail.entity';
import { Product } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailsRepository: Repository<OrderDetail>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { details } = createOrderDto;

    const orderDetails = await Promise.all(
      details.map(async (detail) => {
        const product = await this.productsRepository.findOne({ where: { id: detail.productId } });
        if (!product) {
          throw new NotFoundException(`Product with ID ${detail.productId} not found`);
        }
        const subtotal = product.price * detail.quantity;
        const orderDetail = new OrderDetail();
        orderDetail.product = product;
        orderDetail.quantity = detail.quantity;
        orderDetail.subtotal = subtotal;
        return orderDetail;
      }),
    );

    const total = orderDetails.reduce((sum, detail) => sum + detail.subtotal, 0);

    const order = new Order();
    order.total = total;
    order.details = orderDetails;

    return this.ordersRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find({ relations: ['details', 'details.product'] });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['details', 'details.product'],
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id);
    const { details } = updateOrderDto;

    if (details) {

      await this.orderDetailsRepository.delete({ order: { id } });

      const newDetails = await Promise.all(
        details.map(async (detail) => {
          const product = await this.productsRepository.findOne({ where: { id: detail.productId } });
          if (!product) {
            throw new NotFoundException(`Product with ID ${detail.productId} not found`);
          }
          const subtotal = product.price * detail.quantity;
          const orderDetail = new OrderDetail();
          orderDetail.product = product;
          orderDetail.quantity = detail.quantity;
          orderDetail.subtotal = subtotal;
          orderDetail.order = order;
          return orderDetail;
        }),
      );

      order.total = newDetails.reduce((sum, detail) => sum + detail.subtotal, 0);
      order.details = newDetails;
    }

    this.ordersRepository.save(order);

    return 
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await this.orderDetailsRepository.delete({ order: { id } });
    await this.ordersRepository.remove(order);
  }
}
