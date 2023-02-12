import { RequestHandler } from 'express';

/* --> Async Decorator <-- */

function catchAsyncErrors(): MethodDecorator {
  return (_: any, _2: any, desriptor: PropertyDescriptor) => {
    const originalMethod = desriptor.value;
    // add catch block to the original function
    const decoratedMethod: RequestHandler = (req, res, next) =>
      originalMethod(req, res, next).catch((err: Error) => next(err));

    const newDescriptor: PropertyDescriptor = {
      get() {
        return decoratedMethod;
      },
    };
    return newDescriptor;
  };
}

export default catchAsyncErrors;
