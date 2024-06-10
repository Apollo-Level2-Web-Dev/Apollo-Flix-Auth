import config from "../../config";
import { catchAsync } from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";

const register = catchAsync(async (req, res) => {
  const result = await AuthServices.register(req.body);

  res.status(200).json({
    success: true,
    message: "User registered successfully!",
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const { accessToken, refreshToken } = await AuthServices.login(req.body);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
  });

  res.status(200).json({
    success: true,
    message: "User logged in successfully!",
    data: {
      accessToken,
    },
  });
});

export const authControllers = {
  register,
  login,
};
