import { PoiRow } from './PoiRow';

export class PointOfInterest implements PoiRow {
  constructor(
    private _id: number,
    private _name: string,
    private _type: string,
    private _country: string,
    private _region: string,
    private _lon: number,
    private _lat: number,
    private _description: string,
    private _recommendations: number
  ) {}

  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get type() {
    return this._type;
  }
  get country() {
    return this._country;
  }
  get region() {
    return this._region;
  }
  get lon() {
    return this._lon;
  }
  get lat() {
    return this._lat;
  }
  get description() {
    return this._description;
  }
  get recommendations() {
    return this._recommendations;
  }

  recomend(): void {
    this._recommendations++;
  }

  toJSON() {
    return {
      id: this._id,
      name: this._name,
      type: this._type,
      country: this._country,
      region: this._region,
      lon: this._lon,
      lat: this._lat,
      description: this._description,
      recommendations: this._recommendations,
    };
  }
}
