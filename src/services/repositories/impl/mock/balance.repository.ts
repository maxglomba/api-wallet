import db from '../../../../common/persistence/mock.persistence';
import { Balance } from '../../domain/balance';
import { BalanceRepository } from '../../balance.repository';

export class BalanceMOCKRepository implements BalanceRepository {
    public async all(): Promise<Balance[]> {
        const table = db.balance as Balance[];
        return Object.assign([...table]);
    }

    public async find(id: number): Promise<Balance | null> {
        const table = db.balance as Balance[];
        const result = table.find(x => x.id === id);
        if (result) {
            return Object.assign({ ...result });
        }
        return null;

    }

    public async findByUserId(user_id: number): Promise<Balance | null> {
        const table = db.balance as Balance[];
        const result = table.filter(x => x.user_id === user_id);
        if(result.length){
            return Object.assign({...result[0]});
        }
        return null;
    }

    public async store(entry: Balance): Promise<void> {
        const now = new Date();
        const table = db.balance as Balance[];
        db._balanceId++;
        table.push(
            {
                id: db._balanceId,
                amount: entry.amount,
                user_id: entry.user_id,
                created_at: now,
                updated_at: null
            } as Balance
        );
    }

    public async update(entry: Balance): Promise<void> {
        const now = new Date();
        const table = db.balance as Balance[];

        const originalEntry = table.find(x => x.id === entry.id);
        if (originalEntry) {
            originalEntry.user_id = entry.user_id;
            originalEntry.amount = entry.amount;
            originalEntry.updated_at = now;
        }
    }

    public async remove(id: number): Promise<void> {
        const table = db.balance as Balance[];
        db.balance = table.filter(x => x.id !== id) as any;
    }

}