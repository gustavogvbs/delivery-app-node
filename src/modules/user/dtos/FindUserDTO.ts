import { DefaultParams } from "@utils/DefaultParams";

export interface FindUserRequest {
  id: string;
  token: string;
}

export interface FindUserData extends DefaultParams {
  name: string;
  email: string;
  phone: string;
}

export interface FindUserResponse {
  data: {
    id: string;
    attributes: FindUserData;
  };
}
