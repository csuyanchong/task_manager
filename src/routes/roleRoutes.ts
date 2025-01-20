import express from 'express';
import {assignPermissions, createRole, getRolePermissions} from "../controller/roleController";

const router = express.Router();

// 创建角色
router.post('/', createRole);

// 修改角色权限
router.put('/', assignPermissions);

// 查询角色权限
router.get("/", getRolePermissions);

export default router;