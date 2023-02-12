export var validationTypes;
(function (validationTypes) {
    validationTypes[validationTypes["number"] = 0] = "number";
    validationTypes[validationTypes["string"] = 1] = "string";
    validationTypes[validationTypes["email"] = 2] = "email";
})(validationTypes || (validationTypes = {}));
export const validation = (v) => {
    switch (v.type) {
        case validationTypes.number:
            return v.value >= v.min && v.value <= v.max;
        case validationTypes.string:
            if (v.maxLength) {
                return (v.value.length >= v.minLength &&
                    v.value.length <= v.maxLength);
            }
            else {
                return v.value.length >= v.minLength;
            }
        case validationTypes.email:
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v.value);
        default:
            return false;
    }
};
//# sourceMappingURL=Validatable.js.map