import { PuppeteerService } from '../../accessWebsite/puppeteer.config';

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
      const filteredProducts = await this.puppeteerService.evaluate((nutrition, nova) => {
        const productList = Array.from(document.querySelectorAll('#products_match_all li'));
        console.log('Extraindo informações dos produtos...');
    
        console.log('Formatando a pontuação')
        const extractScore = (iconTitle) => {
          const [_, score] = iconTitle.split(' ');
          return score.charAt(0);
        };

        const filtered = [];
        productList.forEach((item) => {
          const productNutriScoreIcon = item.querySelector('.list_product_icons[title^="Nutri-Score"]');
          const productNutriScoreTitle = productNutriScoreIcon ? productNutriScoreIcon.getAttribute('title') : '';
          const productNutriScore = extractScore(productNutriScoreTitle);
    
          const productNovaIcon = item.querySelector('.list_product_icons[title^="NOVA"]');
          const productNovaTitle = productNovaIcon ? productNovaIcon.getAttribute('title') : '';
          const productNovaScore = extractScore(productNovaTitle);
    
          const productIdElement = item.querySelector('a.list_product_a');
          const productId = productIdElement ? productIdElement.getAttribute('href').split('/').slice(-2, -1)[0] : '';
    
          if (productNutriScore === nutrition && productNovaScore === nova) {
            filtered.push({
              productId,
              productName: item.querySelector('.list_product_name').textContent,
              productNutriScoreTitle,
              productNutriScore,
              productNovaTitle,
              productNovaScore,
            });
          }
        });
    
        return filtered;
      }, nutrition, nova);
    
      console.log('Produtos encontrados e informações extraídas com sucesso.');
      return filteredProducts;    
    } finally {
      await this.puppeteerService.close();
    }
  }
}
