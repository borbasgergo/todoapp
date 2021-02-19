import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { JWTFactory } from "../factory/jwtFactory";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    if(!req.headers.authorization) return res.json({ error: "unauthenticated" })

    try {
        const user = JWTFactory.verifyToken(req.headers.authorization.split(" ")[1])

        if(user) {

            (req as any).user = user
            
            return next()
        } 
    } catch( e ) {
        return res.json({ error: e.message })
    }
    
}