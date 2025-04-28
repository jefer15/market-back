import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  const mockProduct = {
    id: 1,
    name: 'Product 1',
    price: 100,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([mockProduct]),
            findOne: jest.fn().mockResolvedValue(mockProduct),
            create: jest.fn().mockResolvedValue(mockProduct),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all products', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockProduct]);
  });

  it('should create a new product', async () => {
    const result = await controller.create({
      name: 'New Product',
      price: 150,
    });
    expect(result).toEqual(mockProduct);
  });
});
