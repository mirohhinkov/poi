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
  errorMessage: string;
}

export const validation = (v: Validatable) => {
  switch (v.type) {
    case validationTypes.number:
      if (v.max == undefined) return v.value >= v.min!;

      return v.value >= v.min! && v.value <= v.max;

    case validationTypes.string:
      if (v.maxLength == undefined)
        return (v.value as string).length >= v.minLength!;

      return (
        (v.value as string).length >= v.minLength! &&
        (v.value as string).length <= v.maxLength
      );

    case validationTypes.email:
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        v.value as string
      );
    default:
      return false;
  }
};
