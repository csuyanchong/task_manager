import {Request, Response, NextFunction} from "express";

// 定义权限中间件
export const checkRolePermission = (requiredRole: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // 假设用户信息存储在 req.user 中（已通过 JWT 解码）
        const userRole = req.body.user.role; // 用户的角色

        if (userRole === requiredRole) {
            return next(); // 如果角色匹配，继续处理请求
        }

        res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
        return;
    };
};