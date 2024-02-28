import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductFacade } from '../steps/findAllItems/findItems';
import { ProductFacadeById } from '../steps/findById/findItemsById';

@Injectable()
export class ProductsService {
  constructor(private readonly extractorAll: ProductFacade,
    private readonly extractorById: ProductFacadeById
  ) {}

  async findProducts(nutrition: string, nova: string) {
    try {
      const products = await this.extractorAll.scrapeProducts(nutrition, nova);
      if (products.length === 0) {
        throw new NotFoundException('Nenhum produto encontrado');
      }
      return products;

    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findProductsById(id: number) {
    try {
      const FindById = await this.extractorById.scrapeProducts(id)
      if (FindById.length === 0) {
        throw new NotFoundException('Nenhum produto encontrado');
      }
      return FindById;
    } catch (error) {
      console.error('Erro ao buscar produto pelo ID:', error);
      throw new HttpException(error.message, error.status);
    }
  }
}
