export interface UserPayload {
  sub: string;
  email: string;
  name: string;
  address: string;
  iat?: number;
  exp?: number;
}
