import { TimeHolder } from '../../shared/holder/holder';
import { UserCreate } from './command/user.create';
import { UserInterface } from './interface/user.interface';

// TODO: 현재로서 리치 도메인이 될 필요는 없음
export class User {
  readonly id?: number;
  readonly name: string;
  readonly email: string;
  readonly createdAt: number;
  readonly updatedAt: number;

  constructor({ id, name, email, createdAt, updatedAt }: UserInterface) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt.getTime();
    this.updatedAt = updatedAt.getTime();
  }

  static of(userCreate: UserCreate, timeHolder: TimeHolder): User {
    const at = timeHolder.date();
    return new User({
      ...userCreate,
      createdAt: new Date(at),
      updatedAt: new Date(at),
    });
  }
}
