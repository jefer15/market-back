import { IsNotEmpty } from 'class-validator';
export class CreateOrderDetailDto {
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  quantity: number;
}