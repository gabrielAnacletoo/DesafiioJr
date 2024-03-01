import { HttpException, NotFoundException } from '@nestjs/common';
import { PuppeteerService } from '../accessWebsite/puppeteer.config';
import { ProductFilterFacadeById } from './filter/filterById';

export class ProductFacadeById {
  private puppeteerService: PuppeteerService;
  private ProductFilterService: ProductFilterFacadeById;

  constructor() {
    this.puppeteerService = new PuppeteerService();
    this.ProductFilterService = new ProductFilterFacadeById(this.puppeteerService);
  }

  async scrapeProducts(id: number) {
    try {
      
      const response = await this.ProductFilterService.filterProductsById(id)
      return response
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
