import { TUser } from "./user.interface";
import { User } from "./user.model";

const createAdminIntoDB = async (payload: TUser) => {
  const admin = await User.create(payload);
  return admin;
};
const updateUser = async (_id: string, payload: TUser) => {
  const admin = await User.findByIdAndUpdate({ _id }, payload);
  return admin;
};

export const UserServices = {
  createAdminIntoDB,
  updateUser,
};
