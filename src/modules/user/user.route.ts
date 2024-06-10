//  /create-admin, superAdmin,admin post
// /:userid- admin, superadmin put
// /:userid-  get
// /me - user own data. put
//

import express from "express";
import { userControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidations } from "./user.validation";

const router = express.Router();

router.post(
  "/create-admin",
  validateRequest(UserValidations.createAdminValidations),
  userControllers.createAdmin
);
router.put(
  "/:userId",
  validateRequest(UserValidations.updateUserValidations),
  userControllers.updateUser
);

export const UserRoutes = router;
