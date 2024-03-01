export interface ProductsInfo {
    productId: number
    productNutriScoreTitle: string
    productName: string
    productNutriScore: string
    productNovaTitle: string
    productNovaScore: number
}

export interface returnProducts {
        id: number;
        name: string;
        nutrition: {
            score: number;
            title: string;
        };
        nova: {
            score: string;
            title: string;
        }
}