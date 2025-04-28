import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProductService', () => {
  let service: ProductService;
  let repository: Repository<Product>;

  const mockProduct = {
    id: 1,
    name: 'Product 1',
    price: 100,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            find: jest.fn().mockResolvedValue([mockProduct]),
            findOne: jest.fn().mockResolvedValue(mockProduct),
            create: jest.fn().mockReturnValue(mockProduct),
            save: jest.fn().mockResolvedValue(mockProduct),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all products', async () => {
    const products = await service.findAll();
    expect(products).toEqual([mockProduct]);
  });

  it('should create a new product', async () => {
    const newProduct = await service.create({
      name: 'New Product',
      price: 150,
    });
    expect(newProduct).toEqual(mockProduct);
  });
});
