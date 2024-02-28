# API de Desafio para Vaga Junior.
 ### Bem vindo(a)!
 ```bash
Esta API foi desenvolvida para uma vaga de desenvolvedor junior.
Onde eu deveria buscar dados sobre alimentos no site XXXXXX, não sendo necessário persistir esses dados.
A primeira rota deveria ser possivel pesquisar alimentos com utilizado filtros de Nutri-Score e Nova.
A segunda rota deveria retornar as informações de um produto filtrado pelo id.
.
```

```bash
A Nutri-Score é uma classificação nutricional que foi adotada por diversos países e empresas para ajudar os consumidores a comparar a qualidade nutricional dos produtos no momento da compra. 
Ela classifica os alimentos de A (melhor) a E (pior). 
Portanto, os produtos com Nutri-Score A são os mais saudáveis.
.
```

```bash
# Nova
- $ A NOVA, é um sistema de classificação de alimentos, que categoriza produtos alimentícios em quatro grupos com base no grau de processamento ao qual são submetidos. 

# Grupo 1
- O Grupo 1 inclui alimentos não processados ou minimamente processados, como frutas, legumes e carnes. 
# Grupo 2
- O Grupo 2 consiste em ingredientes culinários processados, como óleos, açúcar e sal. 

# Grupo 3
-  O Grupo 3 inclui alimentos processados, como vegetais enlatados e queijos, que contêm ingredientes adicionados como sal, óleo ou açúcar. 

# Grupo 4
- O Grupo 4 inclui alimentos ultra processados, feitos principalmente ou inteiramente a partir de substâncias industriais e contendo pouco ou nenhum alimento integral. Portanto, sua aplicação deve ser capaz de filtrar esses dois critérios.
.
```

## 💻 Instalação

Antes de começar, certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.
```bash
# Clone esse repositório
- $ git clone https://github.com/gabrielAnacletoo/DesavioJr.git

# Vá para o repositório Back-end
- $ cd DesavioJr

# Instale as dependencias
- $ npm i 


# Rode a aplicação
- $ npm run start:dev
```
## Entidades utilizadas no projeto
```bash
- # Products
-  Filtra os produtos por nutri-Score e nova, ou por id.
```


## Rotas da API

### 🔵 GET /products
- **Descrição**: Retorna todos os itens filtrados por nutri-score e nova.
- **Exemplo**:
```
GET /products?nutrition=d&nova=4
```

### Exemplo de resposta para GET /products/

```json
[
	{
		"id": "7891000352175",
		"name": "Nescau - Nestlé - 370 g",
		"nutrition": {
			"score": "d",
			"title": "Nutri-Score desconhecido - Faltam dados para calcular o Nutri-Score"
		},
		"nova": {
			"score": 4,
			"title": "NOVA 4 - Alimentos ultra-processados"
		}
	},
	{
		"id": "7893000394209",
		"name": "Qualy cremosa com sal - 500 g",
		"nutrition": {
			"score": "d",
			"title": "Nutri-Score desconhecido - Faltam dados para calcular o Nutri-Score"
		},
		"nova": {
			"score": 4,
			"title": "NOVA 4 - Alimentos ultra-processados"
		}
	},
	{
		"id": "7894000050027",
		"name": "Maionese Hellmanns Pote 250g - HELLMANN S",
		"nutrition": {
			"score": "d",
			"title": "Nutri-Score desconhecido - Faltam dados para calcular o Nutri-Score"
		},
		"nova": {
			"score": 4,
			"title": "NOVA 4 - Alimentos ultra-processados"
		}
	},
	{
		"id": "7898080640413",
		"name": "Leite Condensado Semidesnatado - Italac - 395 g",
		"nutrition": {
			"score": "d",
			"title": "Nutri-Score desconhecido - Faltam dados para calcular o Nutri-Score"
		},
		"nova": {
			"score": 4,
			"title": "NOVA 4 - Alimentos ultra-processados"
		}
    }
]
```


### 🔵 GET /products/:id
- **Descrição**: Retorna um iem com id encontrado.

```
GET /products/7898215151708
```

### Exemplo de resposta para GET /products/:id

```json
{
	"title": "Leite Integral Piracanjuba - 1 L",
	"quantity": "1 L",
	"ingredients": {
		"hasPalmOil": false,
		"isVegan": false,
		"isVegetarian": false,
		"list": [
			"Leite integral e estabilizantes citrato de sódio, trifosfato de sódio, monofosfato monossódico e difosfato dissódico. ALÉRGICOS CONTÉM LEITE. CONTÉM LACTOSE. NÃO CONTÉM GLÚTEN.",
			"Alergénios Leite"
		]
	},
	"nutrition": {
		"score": "4",
		"values": [
			[
				"moderate",
				"Gorduras/lípidos em quantidade moderada (6.1%)"
			],
			[
				"moderate",
				"Gorduras/lípidos/ácidos gordos saturados em quantidade moderada (3.6%)"
			],
			[
				"low",
				"Açúcares em quantidade baixa (0%)"
			],
			[
				"low",
				"Sal em quantidade baixa (0.12%)"
			]
		],
		"servingSize": "Comparado a: Leites UHT",
		"data": {
			"dadosNutricionais": {
				"Energia": {
					"por100g": "481 kj(115 kcal)",
					"porPorcao": "+100%"
				},
				"Gorduras/lípidos": {
					"por100g": "6,1 g",
					"porPorcao": "+117%"
				},
				"Gorduras/lípidos/ácidos gordos saturados": {
					"por100g": "3,6 g",
					"porPorcao": "+81%"
				},
				"Carboidratos": {
					"por100g": "9,1 g",
					"porPorcao": ""
				},
				"Açúcares": {
					"por100g": "0 g",
					"porPorcao": ""
				},
				"Fibra alimentar": {
					"por100g": "0 g",
					"porPorcao": ""
				},
				"Proteínas": {
					"por100g": "6,1 g",
					"porPorcao": "+83%"
				},
				"Sal": {
					"por100g": "0,12 g",
					"porPorcao": "-5%"
				},
				"Frutas ‚ vegetais ‚ nozes e colza ‚ nogueira e azeite (estimativa da análise da lista de ingredientes)": {
					"por100g": "0 %",
					"porPorcao": ""
				}
			}
		}
	},
	"nova": {
		"score": "4",
		"title": "Alimentos ultra-processados"
	}
}
```

## Documentação da API

Para visualizar a documentação completa da API, acesse o Swagger UI.

[Swagger UI](http://localhost:3000/docs)

### Detalhes Adicionais
- **Autor da API:** [Gabriel Anacleto](https://www.linkedin.com/in/gabriel-anacletoo/) 
- **Contato:** gabrielanacleto159@live.com