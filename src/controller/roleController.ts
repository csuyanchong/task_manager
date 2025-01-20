import { Request, Response } from 'express';
import Role from "../models/roleModel";

// 添加角色
export const createRole = async (req: Request, res: Response) => {
    const { name, permissions } = req.body;
    try {
        const role = await Role.find({name});
        if (role) {
            res.status(400).json({ error: "role already exists" });
        }

        const newRole = new Role({ name, permissions });
        await newRole.save();

        res.status(201).json({
            message: "Role created successfully",
            role: newRole
        });
        return;
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// 分配权限
export const assignPermissions = async (req: Request, res: Response) => {
    const { name, permissions } = req.body;
    try {
        const role = await Role.find({name});
        if (!role) {
            res.status(404).json({ error: "role not found" });
        }
        const updatedRole = await Role.updateOne({name,permissions});
        res.json({updatedRole});
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// 查询角色权限
export const getRolePermissions = async (req: Request, res: Response) => {
    try {
        const roles = await Role.find();
        res.json({ roles });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}