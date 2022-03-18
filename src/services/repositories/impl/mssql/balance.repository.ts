import connector from '../../../../common/persistence/mssql.persistence';
import { BalanceRepository } from '../../balance.repository';
import { Balance } from '../../domain/balance';

export class BalanceMSSQLRepository implements BalanceRepository {

    public async all(): Promise<Balance[]>{
        const pool = await connector;
        const result = await pool.query`SELECT * FROM wallet_balance`;
        return result.recordset as Balance[];

    }

    public async find(id: number): Promise<Balance | null>{
        const pool = await connector;
        const result = await pool.query`SELECT * FROM wallet_balance WHERE id = ${id}`;
        if(result.rowsAffected[0]){
            return result.recordset[0] as Balance;
        }
        return null;
        
    }

    public async findByUserId(user_id: number): Promise<Balance | null>{
        const pool = await connector;
        const result = await pool.query`SELECT * FROM wallet_balance WHERE user_id = ${user_id}`;

        if(result.rowsAffected[0]){
            return result.recordset[0] as Balance;
        }
        return null;
        
    }

    public async store(entry:Balance): Promise<void>{
        const now = new Date();
        const pool = await connector;
        await pool.query`INSERT INTO wallet_balance(user_id, amount, created_at) VALUES(${entry.user_id}, ${entry.amount}, ${now})`;
    }

    public async update(entry:Balance): Promise<void>{
        const now = new Date();
        const pool = await connector;
        await pool.query`UPDATE wallet_balance SET user_id = ${entry.user_id}, amount = ${entry.amount}, updated_at= ${now} WHERE id = ${entry.id}`;
    }
    
    public async remove(id: number): Promise<void>{
        const pool = await connector;
        await pool.query`DELETE FROM wallet_balance WHERE id = ${id}`;
    }

}