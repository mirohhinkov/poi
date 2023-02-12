"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointOfInterest = void 0;
class PointOfInterest {
    _id;
    _name;
    _type;
    _country;
    _region;
    _lon;
    _lat;
    _description;
    _recommendations;
    constructor(_id, _name, _type, _country, _region, _lon, _lat, _description, _recommendations) {
        this._id = _id;
        this._name = _name;
        this._type = _type;
        this._country = _country;
        this._region = _region;
        this._lon = _lon;
        this._lat = _lat;
        this._description = _description;
        this._recommendations = _recommendations;
    }
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
    recomend() {
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
exports.PointOfInterest = PointOfInterest;
