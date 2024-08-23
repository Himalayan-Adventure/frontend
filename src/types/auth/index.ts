type TUser = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TLoginResponse = {
  jwt: string;
  user: TUser;
};

export type TRegisterResponse = {
  jwt: string;
  user: TUser;
};
