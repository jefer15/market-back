import { Exclude } from 'class-transformer';
import { OrderDetail } from 'src/order-detail/entities/order-detail.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column('decimal', { precision: 15, scale: 2 })
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  @Exclude()
  order_details: OrderDetail[];
}