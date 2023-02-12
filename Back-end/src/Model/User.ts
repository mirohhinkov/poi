export class User {
  constructor(
    private _id: number,
    private _username: string,
    private _password: string
  ) {}

  get id() {
    return this._id;
  }
  get username() {
    return this._username;
  }
  get password() {
    return this._password;
  }

  toJSON() {
    return {
      id: this._id,
      username: this._username,
      password: this._password,
    };
  }
}
