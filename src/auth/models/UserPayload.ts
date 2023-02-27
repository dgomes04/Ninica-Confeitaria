export interface UserPayload {
  sub: string;
  email: string;
  name: string;
  address: string;
  admin: boolean;
  iat?: number;
  exp?: number;
}
