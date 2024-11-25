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
