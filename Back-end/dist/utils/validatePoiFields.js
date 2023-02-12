"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validatable_1 = require("./Validatable");
const validatePoiFields = (newPoi) => {
    const validateName = {
        type: Validatable_1.validationTypes.string,
        minLength: 3,
        maxLength: 50,
        value: newPoi.name,
        errorMessage: 'The length of the name must be between 3 and 50 symbols',
    };
    const validateDescription = {
        type: Validatable_1.validationTypes.string,
        minLength: 10,
        value: newPoi.description,
        errorMessage: 'The length of the description must be at least 10 symbols',
    };
    const validateRegion = {
        type: Validatable_1.validationTypes.string,
        minLength: 3,
        maxLength: 20,
        value: newPoi.region,
        errorMessage: 'The length of the region must be between 3 and 20 symbols',
    };
    const validateType = {
        type: Validatable_1.validationTypes.string,
        minLength: 3,
        maxLength: 20,
        value: newPoi.type,
        errorMessage: 'The length of the type must be between 3 and 20 symbols',
    };
    const validations = [
        validateName,
        validateDescription,
        validateRegion,
        validateType,
    ];
    const errs = validations.filter((el) => !(0, Validatable_1.validation)(el));
    return errs.map((el) => el.errorMessage);
};
exports.default = validatePoiFields;
