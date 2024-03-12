export interface MeUserRequest {
  role: string;
  token: string;
}

export interface MeUserData {
  name: string;
  email: string;
  phone: string;
  updated_at: Date;
  created_at: Date;
}

export interface MeUserResponse {
  data: {
    id: string;
    attributes: MeUserData;
  };
}
