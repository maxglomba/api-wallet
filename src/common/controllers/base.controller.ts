import { Response } from 'express';
import { ApplicationExceptions } from '../persistence/exception/application.exception';

export abstract class BaseController {
    handleException(err: any, res: Response){
        if(err instanceof ApplicationExceptions) {
            res.status(400);
            res.send(err.message);
        }else{
            throw new Error(err);
        }
    }
}