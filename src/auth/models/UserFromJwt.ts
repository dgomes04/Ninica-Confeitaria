export interface UserFromJwt {
  id: string;
  email: string;
  name: string;
  admin?: boolean;
  confirmed?: boolean;
}
