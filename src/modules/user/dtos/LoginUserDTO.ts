export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    updated_at: Date;
    created_at: Date;
  };
}
