import connector from '../../../../common/persistence/mssql.persistence';
import { Subscription } from '../../domain/subscription';
import { SubscriptionRepository } from '../../subscription.repository';

export class SubscriptionMSSQLRepository implements SubscriptionRepository {
    //importante implementa la interface con el modelo de repositorio que necesito, de este mismo tomare el molde para cualquier implementacion que necesite hacer, asi estan abstraidas y puedo reemplazarlas si necesito
    public async all(): Promise<Subscription[]> {
        const pool = await connector;
        const result = await pool.query`SELECT * FROM wallet_subscription ORDER BY id DESC`;

        return result.recordset as Subscription[];
    }

    public async find(id: number): Promise<Subscription | null> {
        const pool = await connector;
        const result = await pool.query`SELECT * FROM wallet_subscription WHERE id = ${id}`;

        if (result.rowsAffected[0]) {
            return result.recordset[0] as Subscription;
        }
        return null;
    }

    public async findByUserAndCode(user_id: number, code: string): Promise<Subscription | null> {
        const pool = await connector;
        const result = await pool.query`SELECT * FROM wallet_subscription WHERE user_id = ${user_id} AND code = ${code}`;

        if (result.rowsAffected[0]) {
            return result.recordset[0] as Subscription;
        }
        return null;
    }

    public async checkDuplicated(id: number | null, entry: Subscription): Promise<boolean> {
        const pool = await connector;
        let result;
        if (id) {
            result = await pool.query`SELECT * FROM wallet_subscription WHERE code = ${entry.code} AND id != ${id}`;
        } else {
            result = await pool.query`SELECT * FROM wallet_subscription WHERE code = ${entry.code}`;
        }
        if (result.rowsAffected[0]) {
            return true;
        }

        return false;
    }

    public async store(entry: Subscription): Promise<void> {
        const now = new Date();
        const pool = await connector;
        await pool.query`INSERT INTO wallet_subscription(user_id, code, amount, cron, created_at) VALUES(${entry.user_id}, ${entry.code}, ${entry.amount}, ${entry.cron}, ${now})`;
    }

    public async update(entry: Subscription): Promise<void> {
        const now = new Date();
        const pool = await connector;
        await pool.query`UPDATE wallet_subscription SET user_id = ${entry.user_id}, code = ${entry.code}, amount = ${entry.amount}, cron = ${entry.cron}, updated_at = ${now} WHERE id= ${entry.id}`;

    }

    public async remove(id: number): Promise<void> {
        const pool = await connector;
        await pool.query`DELETE FROM wallet_subscription WHERE id= ${id}`;
    }
}