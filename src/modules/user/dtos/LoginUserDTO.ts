import { DefaultParams } from "@utils/DefaultParams";

export interface LoginUserData extends DefaultParams {
  name: string;
  email: string;
  phone: string;
}

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  token: string;
  user: {
    data: {
      id: string;
      attributes: LoginUserData;
    };
  };
}
