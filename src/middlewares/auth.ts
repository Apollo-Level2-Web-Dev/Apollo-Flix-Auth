import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import { USER_Role, USER_STATUS } from "../modules/user/user.constants";
import { User } from "../modules/user/user.model";
import { catchAsync } from "../utils/catchAsync";

export const auth = (...requiredRoles: (keyof typeof USER_Role)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      throw new AppError(401, "You are not authorized to access this route");
    }

    const verfiedToken = jwt.verify(
      accessToken as string,
      config.jwt_access_secret as string
    );

    const { role, email } = verfiedToken as JwtPayload;

    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError(401, "User not found");
    }

    if (user.status === USER_STATUS.BLOCKED) {
      throw new AppError(401, "User is blocked");
    }

    if (!requiredRoles.includes(role)) {
      throw new AppError(401, "You are not authorized to access this route");
    }

    next();
  });
};
