import dbController from '../Controllers/dbController.js';
import { User } from '../Model/User.js';
import mapToClass from '../utils/mapToClass.js';
import { IUserDao } from './IUserDao';

class UserDao implements IUserDao {
  public async findUserById(id: number): Promise<User | null> {
    const sql = 'SELECT * FROM poi_users WHERE id = ?';
    const sqlArgs = [id];
    const result = await this.queryForUser(sql, sqlArgs);
    return result;
  }

  public async findUserByName(username: string): Promise<User | null> {
    const sql = 'SELECT * FROM poi_users WHERE username = ?';
    const sqlArgs = [username];
    const result = await this.queryForUser(sql, sqlArgs);
    return result;
  }

  private async queryForUser(
    sql: string,
    sqlArgs: any[]
  ): Promise<User | null> {
    const result = await dbController(sql, sqlArgs);
    if (result[0] == undefined) return null;
    return mapToClass(result[0], User);
  }
}

export default new UserDao();
