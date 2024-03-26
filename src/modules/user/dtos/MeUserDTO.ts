import {
  ContractResponseAttr,
  ContractResponseData,
  ContractResponseTimestamps,
} from "@type/contracts";

export interface MeUserRelationTenant {
  slug: string;
  name: string;
  city: string;
  primaryColor: string;
  phone: string;
  userId: string;
}

export interface MeUserRequest {
  role: string;
  token: string;
}

export interface MeUserData extends ContractResponseTimestamps {
  name: string;
  email: string;
  phone: string;

  tenant?: ContractResponseAttr<MeUserRelationTenant>;
}

export type MeUserResponse = ContractResponseData<MeUserData>;
