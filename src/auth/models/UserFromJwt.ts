export interface UserFromJwt {
  id: string;
  email: string;
  name: string;
  address: string;
  admin?: boolean;
}
