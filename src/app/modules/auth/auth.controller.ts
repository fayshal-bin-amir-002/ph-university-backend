import httpStatus from "http-status";
import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken, needsPasswordChange } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
  });

  sendResponse(res, true, httpStatus.OK, "User is logged in succesfully!", {
    accessToken,
    needsPasswordChange,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  const result = await AuthServices.changePassword(req.user, passwordData);
  sendResponse(
    res,
    true,
    httpStatus.OK,
    "Password is updated succesfully!",
    result,
  );
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);
  sendResponse(
    res,
    true,
    httpStatus.OK,
    "Access token is retrieved succesfully!",
    result,
  );
});

export const AuthControllers = {
  loginUser,
  changePassword,
  refreshToken,
};
