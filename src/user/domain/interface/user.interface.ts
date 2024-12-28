import { User } from '../User';

export class UserInterface {
  id?: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  static of(user: User): UserInterface {
    return {
      ...user,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
    };
  }

  static toDomain(user: UserInterface): User {
    return new User(user);
  }
}
