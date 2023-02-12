export class Review {
  constructor(
    private _id: number,
    private _poiId: number,
    private _review: string
  ) {}
  get id() {
    return this._id;
  }
  get poiId() {
    return this._poiId;
  }
  get review() {
    return this._review;
  }

  toJSON() {
    return {
      id: this._id,
      poiId: this._poiId,
      review: this._review,
    };
  }
}
