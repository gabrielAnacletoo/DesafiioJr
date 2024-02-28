import { ApiProperty } from '@nestjs/swagger';

export class NutritionInfo {
  @ApiProperty({ description: 'Nutri-Score', example: 'd' })
  score: string;

  @ApiProperty({ description: 'Descrição do Nutri-Score', example: 'Nutri-Score desconhecido - Faltam dados para calcular o Nutri-Score' })
  title: string;
}

export class NovaInfo {
  @ApiProperty({ description: 'Pontuação NOVA', example: '4' })
  score: string;

  @ApiProperty({ description: 'Descrição da pontuação NOVA', example: 'NOVA 4 - Alimentos ultra-processados' })
  title: string;
}

export class Product {
  @ApiProperty({ description: 'ID do produto', example: '7891000352175' })
  id: string;

  @ApiProperty({ description: 'Nome do produto', example: 'Nescau - Nestlé - 370 g' })
  name: string;

  @ApiProperty({ description: 'Informações nutricionais', type: NutritionInfo })
  nutrition: NutritionInfo;

  @ApiProperty({ description: 'Informações sobre a classificação NOVA', type: NovaInfo })
  nova: NovaInfo;
}

export class GetSuccess {
  @ApiProperty({ description: 'Lista de produtos', type: [Product] })
  products: Product[];
}
