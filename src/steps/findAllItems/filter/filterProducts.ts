import { PuppeteerService } from 'src/steps/accessWebsite/puppeteer.config';

export class ProductFilterFacade {
  constructor(private readonly puppeteerService: PuppeteerService) {}

  async filterProductsByNutritionAndNova(nutrition: string, nova: string) {
    await this.puppeteerService.initialize();
    await this.puppeteerService.goToUrl();

    try {
      this.puppeteerService.setupConsoleListener((msg) => {
        console.log(msg.text());
      });

      console.log('Filtrando produtos por nutrição e pontuação Nova...');
      const products = await this.puppeteerService.evaluate(() => {
        const productList = Array.from(document.querySelectorAll('#products_match_all li'));
        console.log('Extraindo informações dos produtos...');

        return productList.map((item) => {
          const productNutriScoreIcon = item.querySelector('.list_product_icons[title^="Nutri-Score"]');
          const productNutriScoreTitle = productNutriScoreIcon ? productNutriScoreIcon.getAttribute('title') : '';
          const productNutriScore = productNutriScoreTitle.split(' ')[1].charAt(0);

          const productNovaIcon = item.querySelector('.list_product_icons[title^="NOVA"]');
          const productNovaTitle = productNovaIcon ? productNovaIcon.getAttribute('title') : '';
          const productNovaScore = productNovaTitle.split(' ')[1].charAt(0);

          const productIdElement = item.querySelector('a.list_product_a');
          const productId = productIdElement ? productIdElement.getAttribute('href').split('/').slice(-2, -1)[0] : '';

          return {
            productId,
            productName: item.querySelector('.list_product_name').textContent,
            productNutriScoreTitle,
            productNutriScore,
            productNovaTitle,
            productNovaScore,
          };
        });
      });

      if (products) {
        console.log('Produtos encontrados e informações extraídas com sucesso.');
      }

      return products.filter(
        (product) =>
          product.productNutriScore === nutrition &&
          product.productNovaScore === nova,
      );
    } finally {
      await this.puppeteerService.close();
    }
  }
}
