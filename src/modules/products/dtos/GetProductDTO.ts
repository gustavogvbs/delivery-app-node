export interface GetProductData {
  slug: string;
}

export interface GetProductRequest {
  slug: string;
}

export interface GetProductResponse {
  data: {
    id: string;
    attributes: GetProductData;
  };
}
