import db from '../../../../common/persistence/mock.persistence';
import { Subscription } from '../../domain/subscription';
import { SubscriptionRepository } from '../../subscription.repository';

export class SubscriptionMOCKRepository implements SubscriptionRepository {
    public async all(): Promise<Subscription[]> {
        const table = db.subscription as Subscription[];
        return Object.assign([...table]);
    }

    public async find(id: number): Promise<Subscription | null> {
        const table = db.subscription as Subscription[];
        const result = table.find(x => x.id === id);
        if (result) {
            return Object.assign({ ...result });
        }
        return null;

    }

    public async findByUserId(user_id: number): Promise<Subscription[]> {
        const table = db.subscription as Subscription[];
        const result = table.filter(x => x.user_id === user_id) || [];
        return Object.assign([...result]);
    }

    public async findByUserAndCode(user_id: number, code: string): Promise<Subscription | null> {
        const table = db.subscription as Subscription[];
        const result = table.filter(x => x.user_id === user_id && x.code === code);
        if(result.length){
            return Object.assign({...result[0]});
        }
        return null;
    }

    public async checkDuplicated(id: number | null, entry: Subscription): Promise<boolean> {
        const table = db.subscription as Subscription[];
        let result;
        if (id) {
            result = table.find(x => x.code === entry.code &&  x.id !== id );
        } else {
            result = table.find(x => x.code === entry.code);
        }
        if (result) {
            return true;
        }

        return false;
    }

    public async store(entry: Subscription): Promise<void> {
        const now = new Date();
        const table = db.subscription as Subscription[];
        db._subscriptionId++;
        table.push(
            {
                id: db._subscriptionId,
                code: entry.code,
                user_id: entry.user_id,
                amount: entry.amount,
                cron: entry.cron,
                created_at: now,
                updated_at: null
            } as Subscription
        );
    }

    public async update(entry: Subscription): Promise<void> {
        const now = new Date();
        const table = db.subscription as Subscription[];
        const originalEntry = table.find(x => x.id === entry.id);
        if (originalEntry) {
            originalEntry.code = entry.code;
            originalEntry.user_id = entry.user_id;
            originalEntry.amount = entry.amount;
            originalEntry.cron = entry.cron;
            originalEntry.updated_at = now;
        }
    }

    public async remove(id: number): Promise<void> {
        const table = db.subscription as Subscription[];
        db.subscription = table.filter(x => x.id !== id) as any;
    }

}