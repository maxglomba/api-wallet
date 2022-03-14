import connector from '../../../../common/persistence/mysql.persistence';
import { Subscription } from '../../domain/subscription';
import { SubscriptionRepository } from '../../subscription.repository';

export class SubscriptionMySQLRepository implements SubscriptionRepository {
    //importante implementa la interface con el modelo de repositorio que necesito, de este mismo tomare el molde para cualquier implementacion que necesite hacer, asi estan abstraidas y puedo reemplazarlas si necesito
    public async all(): Promise<Subscription[]> {
        const [rows] = await connector.execute(
            'SELECT * FROM wallet_subscription ORDER BY id DESC'
        );

        return rows as Subscription[];
    }

    public async find(id: number): Promise<Subscription | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM wallet_subscription WHERE id = ?',
            [id]
        );

        if(rows.length){
            return rows[0] as Subscription;
        }
        return null;
    }

    public async findByUserAndCode(user_id: number, code: string): Promise<Subscription | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM wallet_subscription WHERE user_id = ? AND code = ?',
            [user_id, code]
        );

        if(rows.length){
            return rows[0] as Subscription;
        }
        return null;
    }

    public async checkDuplicated(id:number | null, entry:Subscription): Promise<boolean> {
        let sql = 'SELECT * FROM wallet_subscription WHERE code = ? AND id != ?';
        let params = [entry.code, id];
        if(!id){
            sql = 'SELECT * FROM wallet_subscription WHERE code = ?';
            params = [entry.code];
        }
        const [rows]: any[] = await connector.execute(
            sql,
            params
        );

        if(rows.length){
            return true;
        }

        return false;
    }
    
    public async store(entry:Subscription): Promise<void> {
        const now = new Date();
        await connector.execute(
            'INSERT INTO wallet_subscription(user_id, code, amount, cron, created_at) VALUES(?, ?, ?, ?, ?)',
            [entry.user_id, entry.code, entry.amount, entry.cron, now]
        );
    }

    public async update(entry:Subscription): Promise<void> {
        const now = new Date();
        await connector.execute(
            'UPDATE wallet_subscription SET user_id = ?, code = ?, amount = ?, cron = ?, updated_at = ? WHERE id= ?',
            [entry.user_id, entry.code, entry.amount, entry.cron, now, entry.id]
        );
    }

    public async remove(id: number): Promise<void> {
        await connector.execute(
            'DELETE FROM wallet_subscription WHERE id= ?',
            [id]
        );
    }
}