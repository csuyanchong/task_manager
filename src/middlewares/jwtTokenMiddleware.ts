import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        res.status(403).json({message: 'Token is missing'});
        return;
    }

    console.assert(process.env.JWT_SECRET_KEY, "Please set the process.env.JWT_SECRET_KEY");
    jwt.verify(token, process.env.JWT_SECRET_KEY || "123456", function (err: any, decoded: any) {
        if (err) {
            res.status(403).json({message: 'Invalid token'});
            return;
        }
        next();
    });
};