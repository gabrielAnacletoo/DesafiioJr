import { PuppeteerService } from '../../../steps/accessWebsite/puppeteer.config';

export class ProductFilterFacadeById {
  constructor(private readonly puppeteerService: PuppeteerService) {}

  async filterProductsById(id: number) {
    await this.puppeteerService.initialize();
    await this.puppeteerService.goToUrlWithId(id);

    try {
      this.puppeteerService.setupConsoleListener((msg) => {
        console.log(msg.text());
      });

      console.log('Iniciando processo de filtragem de produtos por ID...');
      const productName = await this.puppeteerService.evaluate(() => {
        console.log('Extraindo informações do título do produto...');
        const productTitleElement =
          document.querySelector('h2.title-1').textContent;
        console.log('Extraindo informações da quantidade do produto...');
        const productQuantityElement = document
          .querySelector('#field_quantity_value')
          .textContent.trim();
        console.log('Extraindo informações dos ingredientes do produto...');

        const ingredients = Array.from(
          document.querySelectorAll('#panel_ingredients_content .panel_text'),
        ).map((element) =>
          element.textContent
            .trim()
            .replace(/\n/g, '')
            .replace(/\s+/g, ' ')
            .replace(/" \s+/g, '')
            .replace(/\s+"/g, '')
            .replace(/"\s+/g, '')
            .replace(/[":]/g, ''),
        );

        console.log(
          'Verificando presença de óleo de palma, se é vegano ou vegetariano...',
        );
        const ingredientAnalysis = {
          hasPalmOil: false,
          isVegan: false,
          isVegetarian: false,
        };

        const divPanel = document.querySelector(
          '#panel_ingredients_analysis_content',
        );

        console.log(
          'Selecionando todos os elementos h4 dentro das ul e li dentro da div ingredients.',
        );

        const allH4Elements = divPanel.querySelectorAll('ul li a h4');

        const h4Texts = [];

        console.log('Realizando um forEach para formatar os H4.');
        if (allH4Elements) {
          allH4Elements.forEach((h4) => {
            h4Texts.push(h4.textContent.trim());
          });
        }

        console.log('Formatando o retorno de óleo, vegeno e vegetariano.');
        if (
          h4Texts.includes('Pode conter óleo de palma') ||
          h4Texts.includes('Contem óleo de palma')
        ) {
          ingredientAnalysis.hasPalmOil = true;
        }
        if (
          h4Texts.includes('Vegano') ||
          h4Texts.includes('Possivelmente vegano')
        ) {
          ingredientAnalysis.isVegan = true;
        }

        if (
          h4Texts.includes('Vegetariano') ||
          h4Texts.includes('Possivelmente vegetariano')
        ) {
          ingredientAnalysis.isVegetarian = true;
        }

        console.log('Extraindo e formatando o valor de nutri-Score...');
        const productNutriScore = document.querySelector(
          '.attr_text h4.grade_e_title.attr_title',
        ).textContent;
        // Removendo a string
        const trimmedScore = productNutriScore
          .split(' ')
          .slice(1)
          .join(' ')
          .trim();

        console.log(
          'Extraindo valores nutricionais da div panel_nutrient_levels.',
        );
        const panelGroup = document.querySelector('#panel_nutrient_levels');
        const h4Elements = panelGroup.querySelectorAll('h4.evaluation__title');

        const h4testes = [];
        h4Elements.forEach((h4) => {
          h4testes.push(h4.textContent.trim());
        });

        const mappedValues = [];

        console.log('Iterando sobre cada elemento.');
        console.log('Texto h4, formantando pra moderate, high ou low...');
        panelGroup.querySelectorAll('ul.panel_accordion').forEach((ul) => {
          const h4Text = ul
            .querySelector('h4.evaluation__title')
            .textContent.trim();

          // Extrair o valor do ícone com base no texto do h4
          let iconValue: string;
          if (h4Text.includes('moderada')) {
            iconValue = 'moderate';
          } else if (h4Text.includes('elevada')) {
            iconValue = 'high';
          } else if (h4Text.includes('baixa')) {
            iconValue = 'low';
          } else {
            iconValue = 'unknown';
          }

          mappedValues.push([iconValue, h4Text]);
        });

        console.log(
          'Selecionando o terceiro elemento <th> dentro do cabeçalho da tabela.',
        );
        const thirdCell = document.querySelector(
          '#panel_nutrition_facts_table_content div table thead tr th:nth-child(3)',
        );

        console.log('Extraindo o texto da terceira célula');
        const thirdCellValue = thirdCell.textContent.trim();

        console.log(
          'Usando replace para remover tudo o que não está entre parênteses na celula.',
        );
        const valueInsideParentheses = thirdCellValue.replace(
          /^[^(]*\(|\)[^)]*$/g,
          '',
        );

        console.log('Extraindo informações da tabela.');
        const tbody = document.querySelector(
          '#panel_nutrition_facts_table_content div table tbody',
        ) as HTMLTableElement;

        const dadosNutricionais = {};

        console.log('Acessando as linhas da tabela...');
        for (const row of tbody.rows) {
          const nome = row.cells[0].textContent.trim();
          const por100g = row.cells[1].textContent.trim();
          const porPorcao = row.cells[2].textContent.trim();

          dadosNutricionais[nome] = { por100g, porPorcao };
        }

        let novaFormated: string;
        let TitleFormated: string;

        const attributesGrid = document.getElementById('attributes_grid');
        console.log('Acessando segunda li da ul...');
        if (attributesGrid) {
          const liElements = attributesGrid.querySelectorAll('li');

          if (liElements.length >= 2) {
            const segundoLi = liElements[1];
            if (segundoLi) {
              const h4Element = segundoLi.querySelector('h4');

              console.log('Formatando todos os h4 encontrados na li');
              if (h4Element) {
                const textoH4 = h4Element.textContent.trim(); // "NOVA 4"
                const numero = textoH4.match(/\d+/);
                const spanElement = segundoLi.querySelector('span');

                novaFormated = numero ? numero[0] : null;
                console.log(`Valor NOVA Formatado: ${novaFormated}`);

                TitleFormated = spanElement
                  ? spanElement.textContent.trim()
                  : null;
              }
            }
          }
        }

        return {
          title: productTitleElement,
          quantity: productQuantityElement,
          ingredients: {
            hasPalmOil: ingredientAnalysis.hasPalmOil,
            isVegan: ingredientAnalysis.isVegan,
            isVegetarian: ingredientAnalysis.isVegetarian,
            list: ingredients,
          },
          nutrition: {
            score: trimmedScore,
            values: mappedValues,
            servingSize: valueInsideParentheses,
            data: {
              dadosNutricionais,
            },
          },
          nova: {
            score: novaFormated,
            title: TitleFormated,
          },
        };
      });
      if (productName) {
        console.log('Produto encontrado e informações extraídas com sucesso.');
      }
      return productName;
    } finally {
      await this.puppeteerService.close();
    }
  }
}
