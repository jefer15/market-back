import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return {
      statusCode: HttpStatus.CREATED,
      data: await this.orderService.create(createOrderDto),
    };
  }

  @Get()
  async findAll() {
    return {
      statusCode: HttpStatus.OK,
      data: await this.orderService.findAll(),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.orderService.findOne(+id),
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.orderService.update(+id, updateOrderDto),
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.orderService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Order deleted successfully',
    };
  }
}
