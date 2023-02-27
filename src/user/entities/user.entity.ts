export class User {
  id?: string;
  email: string;
  password: string;
  name: string;
  address: string;
  admin?: boolean;
  createdAt: Date;
}
