import { Request, Response} from 'express';
import { route, GET } from 'awilix-express';
import { BalanceService } from '../services/balance.service';
import { BaseController } from '../common/controllers/base.controller';

@route('/balances')
export class BalanceController extends BaseController{
    constructor(
        private readonly balanceService: BalanceService
    ) {
        super();
     }

    @GET()
    public async all (req: Request, res: Response) {
        try{
            res.send(
                await this.balanceService.all()
            );
        }catch(error){
            this.handleException(error, res);
        }
        
    }

    //Ex: balances/1
    @route('/:id')
    @GET()
    public async find (req: Request, res: Response) {
        try{
            const id = parseInt(req.params.id);
            const result = await this.balanceService.find(id);

            if(result){
                res.send(result);
            }else{
                res.status(404);
                res.send();
            }
           
        }catch(error){
            this.handleException(error, res);
        }
    }

     //Ex: balances/1
     @route('/user/:user_id')
     @GET()
     public async findByUserId (req: Request, res: Response) {
         try{
             const user_id = parseInt(req.params.user_id);
             const result = await this.balanceService.findByUserId(user_id);
 
             if(result){
                 res.send(result);
             }else{
                 res.status(404);
                 res.send();
             }
            
         }catch(error){
             this.handleException(error, res);
         }
     }


}