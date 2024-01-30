export interface FindUserRequest {
  id: string;
}

export interface FindUserResponse {
  id: string;
  name: string;
  email: string;
  updated_at: Date;
  created_at: Date;
}
