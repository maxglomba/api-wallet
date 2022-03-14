import { ApplicationExceptions } from '../common/persistence/exception/application.exception';
import { Movement } from './repositories/domain/movement';
//este dominio es una interface con todos los campos que se extraen de la base de datos
import { MovementRepository } from './repositories/movement.repository';

export class MovementService {
    constructor(
        private readonly movementRepository: MovementRepository
        //aca se esta inyectando la dependencia que hice de la implementacion del repositorio pero casteado como la interface que use para crearlo
        //de esta manera esta abstraido, y de querer cambiarlo solamente cambio la dependencia cuando la registro y todo sigue funcionando
        //con otra implementacion del repositorio
    ) {}

    public async find(id: number): Promise<Movement | null> {
        return await this.movementRepository.find(id);
    }

    public async all(): Promise<Movement[]> {
        return await this.movementRepository.all();
    }
    
    public async store(entry: MovementCreateDto): Promise<void> {
        return await this.movementRepository.store(entry as Movement);
    }

    public async update(id: number, entry: MovementUpdateDto): Promise<void> {
        let originalEntry = await this.movementRepository.find(id);
        if(originalEntry){
            originalEntry.amount = entry.amount;
            await this.movementRepository.update(originalEntry);
        } else {
            throw new ApplicationExceptions('Movement not found.');
        }
        
    }

    public async remove(id: number): Promise<void> {
        return await this.movementRepository.remove(id);
    }
}