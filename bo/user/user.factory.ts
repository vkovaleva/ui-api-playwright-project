import { User } from './user';
import * as credentials from '../../data/credentials.json';

export class UserFactory {
  static createUser(email: string, password: string): User {
    return new User(email, password);
  }
  static createUserWithoutPassword(email: string = credentials.email): User {
    return new User(email, '');
  }
  static createUserWithoutEmail(password: string = credentials.password): User {
    return new User('', password);
  }
}
