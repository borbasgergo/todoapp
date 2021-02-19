import { Request, Response } from "express";
import { Repo } from "../repository/Repository";

import bcrypt from "bcrypt"

import { User } from "../entity/User";
import { JWTFactory } from "../factory/jwtFactory";


type LoginCredentails = {
    username?: string,
    password?: string
}

type RegisterCredentails = {
    username?: string,
    password?: string,
    email?: string
}


export abstract class UserController {


    static async get(req: Request, res: Response) {

        const UserRepo = Repo.getRepo("User")

        const user = (req as any).user

        return res.json({
            user: await UserRepo.findOne({
                where: {
                    id: user.id
                }
            })
        })

    }


    static async login(req: Request, res: Response) {

        const UserRepo = Repo.getRepo("User")
        
        const { username, password }: LoginCredentails = req.body 

        if(!username || !password) {
            return res.json({
                error: "Invalid credentails"
            })
        }

        const user: User = await UserRepo.findOne({
            where: {
                username: username
            },
            select: [ 'id', 'password', 'username', 'email' ]
        })

        console.log(user)

        if( user ){

            if( await bcrypt.compare(password, user.password) ) {

                return res.json({
                    jwt: JWTFactory.createToken({
                        user: {
                            id: user.id,
                            username: user.username,
                            email: user.email
                        }
                    })
                })
            } else {
                return res.json({
                    error: "invalid creds"
                })
            }
        } else {
            return res.json({
                error: "invalid creds"
            })
        }

    }

    static async register(req: Request, res:Response){

        const UserRepo = Repo.getRepo("User")

        const { username, email, password }: RegisterCredentails = req.body

        if( !username || !email || !password){
            return res.json({
                credError:"invalid credentails"
            })
        }

        const user = new User()

        user.username = username
        user.email = email
        user.password = password

        await UserRepo.save(user)

        return res.json({
            success: true,
            jwt: JWTFactory.createToken({
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                }
            })
        })

    }

}