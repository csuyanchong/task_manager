import { Request, Response } from 'express';
import User from "../models/userModel";

// 注册用户
export const registerUser = async (req: Request, res: Response) => {
    const { userName } = req.body;

    try {
        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            res.status(400).json({ error: "Username already exists" });
            return;
        }

        const newUser = new User({ userName });
        await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            user: newUser,
        });
        return;
    } catch (error) {
        res.status(500).json({ error: "Server error" });
        return;
    }
};


// 查询用户
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json({ users });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};