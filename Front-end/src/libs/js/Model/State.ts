class State {
  private _region: string = '';
  private _userName: string = '';
  private _reviews: any = null;
  public id: any = null;

  get region() {
    return this._region;
  }

  set region(r: string) {
    this._region = r;
  }

  get userName() {
    return this._userName;
  }
  set userName(userName: string) {
    this._userName = userName;
  }

  get reviews() {
    return this._reviews;
  }
  set reviews(rev) {
    this._reviews = rev;
  }
}

export default new State();
