import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../../order/entities/order.entity';
import { Product } from '../../product/entities/product.entity';

@Entity('order_detail')
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.details)
  order: Order;

  @ManyToOne(() => Product, (product) => product.order_details)
  product: Product;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 20, scale: 2 })
  subtotal: number;

  @CreateDateColumn()
  created_at: Date;
}