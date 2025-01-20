import express from "express";
import connectDB from "./database";
import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";
import roleRoutes from "./routes/roleRoutes";
import {checkRolePermission} from "./middlewares/roleMiddleware";
import loadConfig from "./config/loadConfig";
import {authenticateToken} from "./middlewares/jwtTokenMiddleware";

const app = express();

// 加载配置文件
loadConfig();

// 中间件
app.use(express.json());

// 连接数据库
connectDB();

// 路由
app.use("/users", userRoutes);
app.use("/tasks", authenticateToken,taskRoutes);
app.use("/admin", checkRolePermission("admin"), roleRoutes);

const PORT = process.env.PORT || 3070;
// 启动服务器
app.listen(PORT, () => {
   console.log(`Server running on port: ${PORT}`);
});