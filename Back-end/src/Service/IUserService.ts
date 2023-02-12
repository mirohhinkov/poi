import { User } from '../Model/User';

export interface IUserService {
  login(username: string, passport: string): Promise<User | null>;
  findUser(id: number): Promise<User | null>;
}
