import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderDetail } from 'src/order-detail/entities/order-detail.entity';
import { Product } from 'src/product/entities/product.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Order, OrderDetail, Product])
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
