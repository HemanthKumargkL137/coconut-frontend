export interface Product {
    id: number;
    categoryId: number;
    productName: string;
    price: string;
    thumbnailImage: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    description: string;
    weight: string;
    sku: string;
    productImages?: {
      id: number;
      imageUrl: string;
      displayOrder: number;
    }[];
    tags?: {
      id: number;
      tagName: string;
      description?: string;
    }[];
    productTagNames?: string[];

      category?: {
    id: number;
    name: string;
    slug: string;
  };

}
