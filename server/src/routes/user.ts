import { Router } from "express";
import { loginUser,newUser, getUserInfo } from "../controllers/user";
import validateToken from "./validate-token";

const router = Router();

router.post('/', newUser);
router.post('/login', loginUser);
router.get('/', validateToken, getUserInfo);

export default router;