export class User {
  id: string;
  email: string;
  password: string;
  name: string;
  address: string;
  tel: string;
  confirmed?: boolean;
  admin?: boolean;
  createdAt: Date;
  editedAt?: Date;
  deletedAt?: Date;
}
