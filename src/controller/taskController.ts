import {Request, Response} from 'express';
import User from "../models/userModel";
import Task from "../models/taskModel";
import mongoose from "mongoose";

// 创建任务
export const createTask = async (req: Request, res: Response) => {
    // 从请求中获取参数
    const {userId, title, description, deadline, status, priority} = req.body;

    // 判断required参数是否存在
    if (!userId || !title || !deadline) {
        res.status(400).json({error: 'UserId or title or deadline is required'});
        return;
    }
    // 创建业务逻辑：新建一条记录，保存到数据库。
    try {
        // 先查找用户id是否存在，如果不存在，报错给前端
        const existingUser = await User.findOne({_id: userId});
        if (!existingUser) {
            res.status(400).json({error: "User not find, check the userId"});
            return;
        }
        // 要做的事情
        const newTask = new Task({userId, title, description, deadline, status, priority});
        await newTask.save();
        res.status(201).json({
            message: "Task created successfully",
            task: newTask,
        });
        return;
    } catch (error) {
        res.status(500).json({error: "Server error"});
        return;
    }
};

// 查询任务
export const getTasks = async (req: Request, res: Response) => {
    try {
        const {userId} = req.body;
        const existingUser = await User.findOne({_id: userId});
        if (!existingUser) {
            res.status(400).json({error: "User not find, check the userId"});
            return;
        }

        const tasks = await Task.find({userId: userId});
        res.json({ tasks });
        return;
    } catch (error) {
        res.status(500).json({ error: "Server error" });
        return;
    }
};

// 更新任务
export const updateTask = async (req: Request, res: Response) => {
    // 从请求中获取参数
    const {id} = req.params;
    const updatedFields = req.body;

    if (!id) {
        res.status(400).json({error: 'TaskId is required'});
        return;
    }

    // 数据为空
    if (Object.keys(updatedFields).length === 0) {
        res.status(400).json({ error: 'No fields provided for update' });
        return;
    }

    try {
        // 要做的事情
        const updatedTask = await Task.findByIdAndUpdate(id, { $set: updatedFields }, { new: true });
        res.json(updatedTask);
        return;
    } catch (error) {
        res.status(500).json({error: "Failed to update task"});
        return;
    }
};

// 删除任务
export const deleteTask = async (req: Request, res: Response) => {
    const {id} = req.params;
    if (!id) {
        res.status(400).json({error: 'TaskId is required'});
        return;
    }

    try {
        const result = await Task.findByIdAndDelete(id);
        if (!result) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// 按照条件排序任务
export const getSortedTasks = async (req: Request, res: Response) => {
    // const {id} = req.params;
    // if (!id) {
    //     res.status(400).json({error: 'TaskId is required'});
    //     return;
    // }
    // try {
    //     const users = await User.find();
    //     res.json({ users });
    // } catch (error) {
    //     res.status(500).json({ error: "Server error" });
    // }
};
