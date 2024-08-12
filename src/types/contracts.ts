export interface ContractResponseAttr<T> {
  id: string;
  attributes: T;
}

export interface ContractResponseData<T> {
  data: ContractResponseAttr<T>;
}

export interface ContractResponseArr<T> {
  data: ContractResponseAttr<T>[];
}

export interface ContractResponseTimestamps {
  created_at: Date;
  updated_at: Date;
}
