import { ApiProperty } from '@nestjs/swagger';

export class GetSuccessDoc {
  @ApiProperty({
    type: String,
    description: 'Product title',
    example: 'Leite Integral Piracanjuba - 1 L',
  })
  title: string;

  @ApiProperty({
    type: String,
    description: 'Product quantity',
    example: '1 L',
  })
  quantity: string;

  @ApiProperty({
    type: Object,
    description: 'Product ingredients',
    example: {
      hasPalmOil: false,
      isVegan: false,
      isVegetarian: false,
      list: [
        "Leite integral e estabilizantes citrato de sódio, trifosfato de sódio, monofosfato monossódico e difosfato dissódico. ALÉRGICOS CONTÉM LEITE. CONTÉM LACTOSE. NÃO CONTÉM GLÚTEN.",
        "Alergénios Leite"
      ],
    },
  })
  ingredients: {
    hasPalmOil: boolean;
    isVegan: boolean;
    isVegetarian: boolean;
    list: string[];
  };

  @ApiProperty({
    type: Object,
    description: 'Product nutrition information',
    example: {
      score: '4',
      values: [
        ['moderate', 'Gorduras/lípidos em quantidade moderada (6.1%)'],
        ['moderate', 'Gorduras/lípidos/ácidos gordos saturados em quantidade moderada (3.6%)'],
        ['low', 'Açúcares em quantidade baixa (0%)'],
        ['low', 'Sal em quantidade baixa (0.12%)'],
      ],
      servingSize: 'Comparado a: Leites UHT',
      data: {
        dadosNutricionais: {
          'Energia': { por100g: '481 kj(115 kcal)', porPorcao: '+100%' },
          'Gorduras/lípidos': { por100g: '6,1 g', porPorcao: '+117%' },
          'Gorduras/lípidos/ácidos gordos saturados': { por100g: '3,6 g', porPorcao: '+81%' },
          'Carboidratos': { por100g: '9,1 g', porPorcao: '' },
          'Açúcares': { por100g: '0 g', porPorcao: '' },
          'Fibra alimentar': { por100g: '0 g', porPorcao: '' },
          'Proteínas': { por100g: '6,1 g', porPorcao: '+83%' },
          'Sal': { por100g: '0,12 g', porPorcao: '-5%' },
          'Frutas, vegetais, nozes e colza, nogueira e azeite (estimativa da análise da lista de ingredientes)': { por100g: '0 %', porPorcao: '' },
        },
      },
    },
  })
  nutrition: {
    score: string;
    values: [string, string][];
    servingSize: string;
    data: {
      dadosNutricionais: {
        [key: string]: { por100g: string; porPorcao: string };
      };
    };
  };

  @ApiProperty({
    type: Object,
    description: 'NOVA score and title',
    example: {
      score: '4',
      title: 'Alimentos ultra-processados',
    },
  })
  nova: {
    score: string;
    title: string;
  };
}
