"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = exports.validationTypes = void 0;
var validationTypes;
(function (validationTypes) {
    validationTypes[validationTypes["number"] = 0] = "number";
    validationTypes[validationTypes["string"] = 1] = "string";
    validationTypes[validationTypes["email"] = 2] = "email";
})(validationTypes = exports.validationTypes || (exports.validationTypes = {}));
const validation = (v) => {
    switch (v.type) {
        case validationTypes.number:
            if (v.max == undefined)
                return v.value >= v.min;
            return v.value >= v.min && v.value <= v.max;
        case validationTypes.string:
            if (v.maxLength == undefined)
                return v.value.length >= v.minLength;
            return (v.value.length >= v.minLength &&
                v.value.length <= v.maxLength);
        case validationTypes.email:
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v.value);
        default:
            return false;
    }
};
exports.validation = validation;
