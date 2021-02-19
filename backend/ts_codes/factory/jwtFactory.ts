import jsonwebtoken from "jsonwebtoken"
import { User } from "../entity/User"

export abstract class JWTFactory {

    static createToken<T extends { user: Partial<User> }>({ user }: T): string | never {
        
        try {
            return jsonwebtoken.sign( user, "secret_key")
        } catch( e ) {
            throw new Error("error by creating token")
        }
        
    }

    static verifyToken(toBeVerified: string): User | never {

        const user  = jsonwebtoken.verify(toBeVerified, "secret_key") as User

        if(user) {
            return user
        } else {
            throw new Error("invalid token")
        }

    }

}