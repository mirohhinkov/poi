import { PoiRow } from '../Model/PoiRow';
import { validationTypes, Validatable, validation } from './Validatable';

const validatePoiFields = (newPoi: PoiRow) => {
  const validateName: Validatable = {
    type: validationTypes.string,
    minLength: 3,
    maxLength: 50,
    value: newPoi.name,
    errorMessage: 'The length of the name must be between 3 and 50 symbols',
  };

  const validateDescription: Validatable = {
    type: validationTypes.string,
    minLength: 10,
    value: newPoi.description,
    errorMessage: 'The length of the description must be at least 10 symbols',
  };

  const validateRegion: Validatable = {
    type: validationTypes.string,
    minLength: 3,
    maxLength: 20,
    value: newPoi.region,
    errorMessage: 'The length of the region must be between 3 and 20 symbols',
  };

  const validateType: Validatable = {
    type: validationTypes.string,
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
  const errs = validations.filter((el) => !validation(el));

  return errs.map((el) => el.errorMessage);
};
export default validatePoiFields;
