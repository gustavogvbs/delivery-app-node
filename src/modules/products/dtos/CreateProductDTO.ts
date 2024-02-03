export interface CreateProductRequest {
  name: string;
  price: number;
  description: string;
  tenantId: string;
  categoryId: string;
}

export interface CreateProductResponse {}
