export type User = {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

export type UserCreateParams = Omit<User, 'id' | 'createdAt'>