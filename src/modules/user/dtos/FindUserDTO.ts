export interface FindUserRequest {
  id: string;
  token: string;
}

export interface FindUserData {
  name: string;
  email: string;
  phone: string;
  updated_at: Date;
  created_at: Date;
}

export interface FindUserResponse {
  data: {
    id: string;
    attributes: FindUserData;
  };
}
