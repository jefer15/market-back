import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import * as PDFDocument from 'pdfkit';
import { Response } from 'express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get('top3')
  async findTop3() {
    return {
      statusCode: HttpStatus.OK,
      data: await this.productService.findTop3(),
    };
  }


  @Get('top3/pdf')
  async getTop3Pdf(@Res() res: Response) {
    const topProducts = await this.productService.findTop3();

    const doc = new PDFDocument();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=top-3-products.pdf');

    doc.pipe(res);

    doc.fontSize(20).text('Top 3 Productos Más Vendidos', { align: 'center' });
    doc.moveDown();

    doc.fontSize(12);

    const formatCurrency = (value: number) => {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
      }).format(value);
    };

    topProducts.forEach((product, index) => {
      doc.text(`${index + 1}. ${product.name}`, { continued: true });
      doc.text(formatCurrency(Number(product.price)), { align: 'right' });
      doc.moveDown(0.5);
    });

    doc.end();
  }
  

  @Get()
  async findAll() {
    return {
      statusCode: HttpStatus.OK,
      data: await this.productService.findAll()
    }
   
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
