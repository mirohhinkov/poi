"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* --> Async Decorator <-- */
function catchAsyncErrors() {
    return (_, _2, desriptor) => {
        const originalMethod = desriptor.value;
        // add catch block to the original function
        const decoratedMethod = (req, res, next) => originalMethod(req, res, next).catch((err) => next(err));
        const newDescriptor = {
            get() {
                return decoratedMethod;
            },
        };
        return newDescriptor;
    };
}
exports.default = catchAsyncErrors;
