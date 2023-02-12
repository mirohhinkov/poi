class State {
    _region = '';
    _userName = '';
    _reviews = null;
    id = null;
    get region() {
        return this._region;
    }
    set region(r) {
        this._region = r;
    }
    get userName() {
        return this._userName;
    }
    set userName(userName) {
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
//# sourceMappingURL=State.js.map