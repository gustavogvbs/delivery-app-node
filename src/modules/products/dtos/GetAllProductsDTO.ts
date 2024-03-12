export interface GetAllProductsData {
  tenantId: string;
}

export interface GetAllProductsRequest {
  tenantId: string;
}
export interface GetAllProductsResponse {
  data: {
    id: string;
    attributes: GetAllProductsData;
  }[];
}
