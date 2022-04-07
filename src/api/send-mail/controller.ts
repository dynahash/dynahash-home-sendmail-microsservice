import { log } from "./../../utils/log";
import { SendMail } from "./../../providers/send-mail/send-mail.service";
import { StatusCodeEnum } from "./../../enums/status-code";
import type { UserMail } from "./../../entities/user-mail.entity";
import type { Request, Response } from "express";

export const sendMailController = async (req: Request, res: Response): Promise<Response> => {
    const body = req.body as UserMail;

    try {
        await SendMail.send(body);
    } catch (err) {
        return res.status(StatusCodeEnum.CONFLICT).json(err.message);
    }

    log.info("Email has been sended");

    return res.status(StatusCodeEnum.SUCCESS).json({
        statusCode: StatusCodeEnum.SUCCESS,
        body: {},
    });
};