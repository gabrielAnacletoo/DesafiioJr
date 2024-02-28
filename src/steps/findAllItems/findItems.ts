import { HttpException, NotFoundException } from '@nestjs/common';
import { PuppeteerService } from '../accessWebsite/puppeteer.config';
import { ProductFilterFacade } from './filter/filterProducts';
import { ProductsInfo } from 'src/utils/types';

export class ProductFacade {
  private puppeteerService: PuppeteerService;
  private ProductFilterService: ProductFilterFacade;

  constructor() {
    this.puppeteerService = new PuppeteerService();
    this.ProductFilterService = new ProductFilterFacade(this.puppeteerService);
  }

  async scrapeProducts(nutrition: string, nova: string): Promise<any> {
    try {
      const response: ProductsInfo[] =
        await this.ProductFilterService.filterProductsByNutritionAndNova(
          nutrition,
          nova,
        );

      // Mapear os produtos filtrados para um novo array de objetos com as propriedades desejadas
      const formattedProducts = response.map((item: any) => ({
        id: item.productId,
        name: item.productName,
        nutrition: {
          score: item.productNutriScore,
          title: item.productNutriScoreTitle,
        },
        nova: {
          score: parseInt(item.productNovaScore),
          title: item.productNovaTitle,
        },
      }));

      return formattedProducts;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
