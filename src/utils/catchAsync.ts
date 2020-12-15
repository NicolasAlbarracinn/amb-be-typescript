/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';

//this forward any unhandled error to error handler middleware
const catchAsync = (fn: any): RequestHandler => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
