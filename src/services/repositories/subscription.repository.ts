import { Subscription } from './domain/subscription';

//importante, esta interface es utilizada para las implementaciones de cada bd que quiera utilizar, asi que es el modelo, cuando utilizo las implementaciones en los services, son casteadas a este modelo para quedar abstraidas
export interface SubscriptionRepository {
    all(): Promise<Subscription[]>;
    find(id: number): Promise<Subscription | null>;
    findByUserAndCode(user_id: number, code: string): Promise<Subscription | null>;
    checkDuplicated(id:number | null, entry:Subscription): Promise<boolean>;
    store(entry:Subscription): Promise<void>; 
    update(entry:Subscription): Promise<void>;
    remove(id: number): Promise<void>;
}