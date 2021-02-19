import { Request, Response } from "express";

export class RouterController {

    static get(req: Request, res: Response) {
        return res.json({
            msg: "okay"
        })
    }
}