import express from 'express';
import {getAllUsers, registerUser} from "../controller/userController";

const router = express.Router();

// 注册用户
router.post("/register", registerUser);

// 查询所有用户
router.get("/", getAllUsers);

export default router;