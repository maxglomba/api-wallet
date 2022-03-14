import { Request, Response} from 'express';
import { route, GET, POST, PUT, DELETE } from 'awilix-express';
import { MovementService } from '../services/movement.service';
import { BaseController } from '../common/controllers/base.controller';

@route('/movements')
export class MovementController extends BaseController{
    constructor(
        private readonly movementService: MovementService
    ) {
        super();
     }

    @GET()
    public async all (req: Request, res: Response) {
        try{
            res.send(
                await this.movementService.all()
            );
        }catch(error){
            this.handleException(error, res);
        }
        
    }

    //Ex: movements/1
    @route('/:id')
    @GET()
    public async find (req: Request, res: Response) {
        try{
            const id = parseInt(req.params.id);
            const result = await this.movementService.find(id);

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
            await this.movementService.store({
                user_id: req.body.user_id,
                amount: req.body.amount,
                type: req.body.type,
            } as MovementCreateDto);

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
            await this.movementService.update(id, {
                amount: req.body.amount,
                type: req.body.type,
            } as MovementUpdateDto);
            
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
            await this.movementService.remove(id);
            res.send();
        }catch(error){
            this.handleException(error, res);
        }
    }

}