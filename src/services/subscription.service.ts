import { ApplicationExceptions } from '../common/persistence/exception/application.exception';
import { SubscriptionCreateDto, SubscriptionUpdateDto } from '../dtos/subscription.dto';
import { Subscription } from './repositories/domain/subscription';
//este dominio es una interface con todos los campos que se extraen de la base de datos
import { SubscriptionRepository } from './repositories/subscription.repository';

export class SubscriptionService {
    constructor(
        private readonly subscriptionRepository: SubscriptionRepository
        //aca se esta inyectando la dependencia que hice de la implementacion del repositorio pero casteado como la interface que use para crearlo
        //de esta manera esta abstraido, y de querer cambiarlo solamente cambio la dependencia cuando la registro y todo sigue funcionando
        //con otra implementacion del repositorio
    ) {}

    public async find(id: number): Promise<Subscription | null> {
        return await this.subscriptionRepository.find(id);
    }

    public async all(): Promise<Subscription[]> {
        return await this.subscriptionRepository.all();
    }
    
    public async store(entry: SubscriptionCreateDto): Promise<void> {
        const isDuplicatedCode = await this.subscriptionRepository.checkDuplicated(null, entry as Subscription);
        if(isDuplicatedCode){
            throw new ApplicationExceptions('Code is duplicated');
        }
        const originalEntry = await this.subscriptionRepository.findByUserAndCode(entry.user_id, entry.code);
        if(!originalEntry){
            await this.subscriptionRepository.store(entry as Subscription);
        } else {
            throw new ApplicationExceptions('User subscription already exists.');
        }
    }

    public async update(id: number, entry: SubscriptionUpdateDto): Promise<void> {
        const isDuplicatedCode = await this.subscriptionRepository.checkDuplicated(id, entry as Subscription);
        if(isDuplicatedCode){
            throw new ApplicationExceptions('Code is duplicated');
        }
        const originalEntry = await this.subscriptionRepository.find(id);
        if(originalEntry){
            originalEntry.code = entry.code;
            originalEntry.amount = entry.amount;
            originalEntry.cron = entry.cron;
            await this.subscriptionRepository.update(originalEntry);
        } else {
            throw new ApplicationExceptions('Subscription not found.');
        }
        
    }

    public async remove(id: number): Promise<void> {
        return await this.subscriptionRepository.remove(id);
    }
}