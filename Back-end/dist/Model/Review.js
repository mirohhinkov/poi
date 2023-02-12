"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
class Review {
    _id;
    _poiId;
    _review;
    constructor(_id, _poiId, _review) {
        this._id = _id;
        this._poiId = _poiId;
        this._review = _review;
    }
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
exports.Review = Review;
