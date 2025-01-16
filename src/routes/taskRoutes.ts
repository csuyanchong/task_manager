import express from 'express';
import {createTask, deleteTask, getSortedTasks, getTasks, updateTask} from "../controller/taskController";

const router = express.Router();

// 创建任务
router.post("/", createTask);

// 查询任务
router.get("/", getTasks);

// 更新任务
router.put("/:id", updateTask);

// 删除任务
router.delete("/:id", deleteTask);

// 排序任务
router.get("/", getSortedTasks);

export default router;