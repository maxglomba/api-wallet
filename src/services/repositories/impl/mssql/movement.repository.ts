import connector from '../../../../common/persistence/mssql.persistence';
import { Movement } from '../../domain/movement';
import { MovementRepository } from '../../movement.repository';

export class MovementMSSQLRepository implements MovementRepository {
    public async all(): Promise<Movement[]>{
        const pool = await connector;
        const result = await pool.query`SELECT * FROM wallet_movement`;

        return result.recordset as Movement[];

    }

    public async find(id: number): Promise<Movement | null>{
        const pool = await connector;
        const result = await pool.query`SELECT * FROM wallet_movement WHERE id = ${id}`;
        if(result.rowsAffected[0]){
            return result.recordset[0] as Movement;
        }
        return null;
        
    }

    public async findByUserId(user_id: number): Promise<Movement[]>{
        const pool = await connector;
        const result = await pool.query`SELECT * FROM wallet_movement WHERE user_id = ${user_id}`;
        return result.recordset as Movement[];
        
    }

    public async store(entry:Movement): Promise<void>{
        const now = new Date();
        const pool = await connector;
        await pool.query`INSERT INTO wallet_movement(user_id, type, amount, created_at) VALUES(${entry.user_id}, ${entry.type}, ${entry.amount}, ${now})`;
    }

    public async update(entry:Movement): Promise<void>{
        const now = new Date();
        const pool = await connector;
        await pool.query`UPDATE wallet_movement SET user_id = ${entry.user_id}, type = ${entry.type}, amount = ${entry.amount}, updated_at= ${now} WHERE id = ${entry.id}`;
    }
    
    public async remove(id: number): Promise<void>{
        const pool = await connector;
        await pool.query`DELETE FROM wallet_movement WHERE id = ${id}`;
    }

}