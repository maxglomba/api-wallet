import connector from '../../../../common/persistence/mysql.persistence';
import { Movement } from '../../domain/movement';
import { MovementRepository } from '../../movement.repository';

export class MovementMySQLRepository implements MovementRepository {
    public async all(): Promise<Movement[]>{
        const [rows] = await connector.execute(
                'SELECT * FROM wallet_movement'
            );
        return rows as Movement[];

    }

    public async find(id: number): Promise<Movement | null>{
        const [rows]: any[] = await connector.execute(
                'SELECT * FROM wallet_movement WHERE id = ? ',
                [id]
            );
        if(rows.length){
            return rows[0] as Movement;
        }
        return null;
        
    }

    public async findByUserId(user_id: number): Promise<Movement[]>{
        const [rows] = await connector.execute(
                'SELECT * FROM wallet_movement WHERE user_id = ? ',
                [user_id]
            );
        return rows as Movement[];
        
    }

    public async store(entry:Movement): Promise<void>{
        const now = new Date();
        await connector.execute(
            'INSERT INTO wallet_movement(user_id, type, amount, created_at) VALUES(?, ?, ?, ?)',
            [entry.user_id, entry.type, entry.amount, now]
        );
    }

    public async update(entry:Movement): Promise<void>{
        const now = new Date();
        await connector.execute(
            'UPDATE wallet_movement SET user_id = ?, type = ?, amount = ?, updated_at= ? WHERE id = ?',
            [entry.user_id, entry.type, entry.amount, now, entry.id]
        );
    }
    
    public async remove(id: number): Promise<void>{
        await connector.execute(
            'DELETE FROM wallet_movement WHERE id = ?',
            [ id]
        );
    }

}