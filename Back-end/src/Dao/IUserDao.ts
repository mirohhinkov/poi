import { User } from '../Model/User';

export interface IUserDao {
  findUserById(id: number): Promise<User | null>;
  findUserByName(username: string): Promise<User | null>;
  // login(username: string, password: string): Promise<User | null>;
}
