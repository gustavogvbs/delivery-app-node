export interface IUserType {
  id: string;
  name: string;
  email: string;
  updated_at: Date;
  created_at: Date;
}

export interface UserResponseType {
  user: IUserType;
  token: string;
}
