import { IsNotEmpty, Min } from 'class-validator';
export class CreateOrderDetailDto {
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  @Min(1)
  quantity: number;
}