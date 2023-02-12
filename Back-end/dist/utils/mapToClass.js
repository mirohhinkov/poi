"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mapToClass = (source, resource) => {
    return new resource(...Object.values(source));
};
exports.default = mapToClass;
