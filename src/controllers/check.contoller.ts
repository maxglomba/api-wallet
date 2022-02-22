import { Request, Response} from 'express';
import { route, GET } from 'awilix-express';
import { TestService } from '../services/test.service';
@route('/check')
export class DefaultController {
    constructor( private readonly testService: TestService){

    }


    @GET()
    public index (req: Request, res: Response):void {
        res.send({
            NODE_ENV:process.env.NODE_ENV || 'development',
            APP_ENV: process.env.APP_ENV || 'development'
        });
    }

    @route('/test')
    @GET()
    public test (req: Request, res: Response):void {
        res.send(
           this.testService.get()
        );
    }

}