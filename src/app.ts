import express from "express";
import connectDB from "./database";
import userRoutes from "./routes/userRoutes";

const app = express();
const PORT = "3070";

// 中间件
app.use(express.json());

// 数据库链接
connectDB();

// 路由
app.use("/users", userRoutes);

// 启动服务器
app.listen(PORT, () => {
   console.log(`Server running on port: ${PORT}`);
});