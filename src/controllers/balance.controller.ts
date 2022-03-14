import { Request, Response} from 'express';
import { route, GET, POST, PUT, DELETE } from 'awilix-express';
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

    @POST()
    public async create (req: Request, res: Response) {
        try{
            await this.balanceService.store({
                user_id: req.body.user_id,
                amount: req.body.amount,
            } as BalanceCreateDto);

            res.send();
        }catch(error){
            this.handleException(error, res);
        }
    }

    @route('/:id')
    @PUT()
    public async update (req: Request, res: Response) {
        try{
            const id = parseInt(req.params.id);
            await this.balanceService.update(id, {
                amount: req.body.amount,
            } as BalanceUpdateDto);
            
            res.send();
        }catch(error){
            this.handleException(error, res);
        }
    }

    @route('/:id')
    @DELETE()
    public async remove (req: Request, res: Response) {
        try{
            const id = parseInt(req.params.id);
            await this.balanceService.remove(id);
            res.send();
        }catch(error){
            this.handleException(error, res);
        }
    }

}