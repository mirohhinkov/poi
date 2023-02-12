export enum validationTypes {
  number,
  string,
  email,
}

export interface Validatable {
  value: string | number;
  type: validationTypes;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export const validation = (v: Validatable) => {
  switch (v.type) {
    case validationTypes.number:
      return v.value >= v.min! && v.value <= v.max!;
    case validationTypes.string:
      if (v.maxLength) {
        return (
          (<string>v.value).length >= v.minLength! &&
          (<string>v.value).length <= v.maxLength
        );
      } else {
        return (<string>v.value).length >= v.minLength!;
      }
    case validationTypes.email:
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        v.value as string
      );
    default:
      return false;
  }
};
