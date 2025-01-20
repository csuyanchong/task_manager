import {Request, Response} from 'express';
import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// 注册用户
export const registerUser = async (req: Request, res: Response) => {
    const {userName, password, role, email, createAt, lastLogin} = req.body;

    try {
        // 检查数据
        if (!userName || !password || !role || !email) {
            res.status(400).json({error: 'Invalid Params!'});
            return;
        }

        const existingUser = await User.findOne({userName});
        if (existingUser) {
            res.status(400).json({error: "Username already exists"});
            return;
        }

        // 加密密码
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                // 存储密码到数据库
                const newUser = new User({userName, password: hash, role, email, createAt, lastLogin});
                await newUser.save();

                res.status(201).json({
                    message: "User registered successfully",
                    user: newUser,
                });
                return;
            });
        });
    } catch (error) {
        res.status(500).json({error: "Server error"});
        return;
    }
};

// 查询用户
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json({users});
    } catch (error) {
        res.status(500).json({error: "Server error"});
    }
};

// 用户登录
export const login = async (req: Request, res: Response) => {
    const {userName, password} = req.body;
    try {
        // 检查数据
        if (!userName || !password) {
            res.status(400).json({error: 'Invalid Params!'});
            return;
        }

        const user = await User.findOne({userName: userName});
        if (!user) {
            res.status(404).json({error: "Username not found"});
            return;
        }
        // 校对密码
        bcrypt.compare(password, user.password, async function (err, result) {
            if (result) {
                // 密码正确, 返回jwt token
                const payload = {userId: user._id, role: user.role};
                console.assert(process.env.JWT_SECRET_KEY, "Please set the process.env.JWT_SECRET_KEY");
                const secretKey = process.env.JWT_SECRET_KEY || "123456";
                const token = jwt.sign(payload, secretKey, {expiresIn: "1h"});

                // 更新登录时间
                const lastLoginDate = new Date();
                await user.updateOne({lastLogin: lastLoginDate});
                // await User.updateOne(user, {lastLogin: lastLoginDate});
                res.json({token: token});
                return;
            } else {
                res.status(400).json({error: "Invalid password"});
            }
        });

    } catch (error) {
        res.status(500).json({error: "Server error"});
    }
};