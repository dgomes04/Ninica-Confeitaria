export interface UserPayload {
  sub: string;
  email: string;
  name: string;
  tel: string;
  confirmed: boolean;
  address: string;
  admin: boolean;
  iat?: number;
  exp?: number;
}
