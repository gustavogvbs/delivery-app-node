export interface UserAuthData {
  role: string;
  token: string;
}

export interface UserAuthRequest {
  role: string;
  token: string;
}

export interface UserAuthResponse {
  data: {
    id: string;
    attributes: UserAuthData;
  };
}
