import { TImage } from "../strapi/image";

export type TUser = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  userType: string;
};

export type TLoginResponse = {
  jwt: string;
  user: TUser;
};

export type TRegisterResponse = {
  jwt: string;
  user: TUser;
};

export interface TUserDeep {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  userType: string;
  profilePicture?: TImage;
  about?: About;
  resume?: Resume;
  contact?: Contact;
}

export interface About {
  id: number;
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
  description?: string;
}

export interface Resume {
  id: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  location?: string;
  portfolio?: string;
  hard_skill?: string;
  technical_skill?: string;
  interest?: string;
  education?: Education[];
}

export interface Education {
  id: number;
  education?: string;
}

export interface Contact {
  id: number;
  phone?: string;
  email: string;
  birthday?: string;
  address?: string;
  gender?: string;
  reports_to?: string;
  citizenship?: string;
  nationality?: string;
  religion?: string;
  marital_status?: string;
}
