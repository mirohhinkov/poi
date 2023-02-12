import { IUserService } from './IUserService';
import { User } from '../Model/User';
import UserDao from '../Dao/UserDao';
import checkPassword from '../utils/checkPassword';

class UserService implements IUserService {
  public async login(username: string, password: string): Promise<User | null> {
    const user: User | null = await UserDao.findUserByName(username);

    if (checkPassword(user, password)) return user;
    return null;
  }

  public async findUser(id: number): Promise<User | null> {
    return UserDao.findUserById(id);
  }
}

export default new UserService();
