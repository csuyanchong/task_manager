import express from "express";
import connectDB from "./database";
import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";

const app = express();
const PORT = "3070";

// 中间件
app.use(express.json());

// 数据库链接
connectDB();

// 路由
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

// 启动服务器
app.listen(PORT, () => {
   console.log(`Server running on port: ${PORT}`);
});