export interface LoginUserData {
  name: string;
  email: string;
  phone: string;
  updated_at: Date;
  created_at: Date;
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
