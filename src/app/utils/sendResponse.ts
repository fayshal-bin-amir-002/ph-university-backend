import { Response } from "express";

const sendResponse = <T>(
  res: Response,
  success: boolean,
  status: number,
  message: string,
  data: T
) => {
  res.status(status).json({
    success: success,
    message: message,
    data: data,
  });
};

export default sendResponse;

//use the below one ----------------------------

// import { Response } from 'express';

// type TMeta = {
//   limit: number;
//   page: number;
//   total: number;
//   totalPage: number;
// };

// type TResponse<T> = {
//   statusCode: number;
//   success: boolean;
//   message?: string;
//   meta?: TMeta;
//   data: T;
// };

// const sendResponse = <T>(res: Response, data: TResponse<T>) => {
//   res.status(data?.statusCode).json({
//     success: data.success,
//     message: data.message,
//     meta: data.meta,
//     data: data.data,
//   });
// };

// export default sendResponse;
