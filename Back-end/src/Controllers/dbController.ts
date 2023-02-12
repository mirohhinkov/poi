import mysql from 'mysql2';
import { dbD } from '../utils/dbDescriptor';

const dbController: any = (sql: string, sqlArgs: any[]) => {
  return new Promise((resolve, reject) => {
    const conn: mysql.Connection = mysql.createConnection(dbD);
    conn.connect((err: mysql.QueryError | null) => {
      if (err) reject(err); // rejects the promise on connection error
      conn.execute(
        sql,
        sqlArgs,
        (
          err: mysql.QueryError | null,
          result:
            | mysql.RowDataPacket[]
            | mysql.RowDataPacket[][]
            | mysql.OkPacket
            | mysql.OkPacket[]
            | mysql.ResultSetHeader
        ) => {
          if (err) reject(err); //
          resolve(result);
        }
      );
    });
  });
};

export default dbController;
