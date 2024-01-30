export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface CreateUserResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    updated_at: Date;
    created_at: Date;
  };
}
