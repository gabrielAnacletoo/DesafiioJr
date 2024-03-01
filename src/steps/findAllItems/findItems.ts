import { HttpException, NotFoundException } from '@nestjs/common';
import { PuppeteerService } from '../accessWebsite/puppeteer.config';
import { ProductFilterFacade } from './filter/filterProducts';
import { ProductsInfo, returnProducts } from 'src/@types/products.types';

export class ProductFacade {
  private puppeteerService: PuppeteerService;
  private ProductFilterService: ProductFilterFacade;

  constructor() {
    this.puppeteerService = new PuppeteerService();
    this.ProductFilterService = new ProductFilterFacade(this.puppeteerService);
  }

  async scrapeProducts(nutrition: string, nova: string) {
    try {
      const response: ProductsInfo[] =
        await this.ProductFilterService.filterProductsByNutritionAndNova(
          nutrition,
          nova,
        );

      const formattedProducts = response.map((item: ProductsInfo) => ({
        id: item.productId,
        name: item.productName,
        nutrition: {
          score: item.productNutriScore,
          title: item.productNutriScoreTitle,
        },
        nova: {
          score: parseInt(item.productNovaScore.toString()),
          title: item.productNovaTitle,
        },
      }));

      return formattedProducts;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
