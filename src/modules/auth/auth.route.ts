//  /create-admin, superAdmin,admin post
// /:authid- admin, superadmin put
// /:authid-  get
// /me - auth own data. put
//

import express from "express";
import { authControllers } from "./auth.controller";

const router = express.Router();

router.post("/register", authControllers.register);
router.post("/login", authControllers.login);

export const AuthRoutes = router;

//login /api/auth/login
//register /api/auths/create-student : /api/auth/register
//forgot password /api/auth/forgot-password
//refresh token /api/auth/refresh-token
