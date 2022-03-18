import { MovementType } from '../common/enums/movement-types';
import { ApplicationExceptions } from '../common/persistence/exception/application.exception';
import { MovementCreateDto } from '../dtos/movement.dto';
import { BalanceRepository } from './repositories/balance.repository';
import { Balance } from './repositories/domain/balance';
import { Movement } from './repositories/domain/movement';
//este dominio es una interface con todos los campos que se extraen de la base de datos
import { MovementRepository } from './repositories/movement.repository';

export class MovementService {
    constructor(
        private readonly movementRepository: MovementRepository,
        private readonly balanceRepository: BalanceRepository
    ) { }

    public async find(id: number): Promise<Movement | null> {
        return await this.movementRepository.find(id);
    }

    public async findByUserId(user_id: number): Promise<Movement[]> {
        return await this.movementRepository.findByUserId(user_id);
    }



    public async all(): Promise<Movement[]> {
        return await this.movementRepository.all();
    }

    public async store(entry: MovementCreateDto): Promise<void> {
        const balance = await this.balanceRepository.findByUserId(entry.user_id);
        if (entry.amount >= 0) {
            if (entry.type === MovementType.income) {
                return await this.income(entry, balance);
            } else if (entry.type === MovementType.outcome) {
                return await this.outcome(entry, balance);
            } else {
                throw new ApplicationExceptions('Invalid movement type supplied.');
            }
        }
        throw new Error('Error saving Movement.');
    }


    //PRIVATE METHODS

    private async income(entry: MovementCreateDto, balance: Balance | null): Promise<void> {
        await this.movementRepository.store(entry as Movement);
        if (balance) {
            balance.amount += entry.amount;
            await this.balanceRepository.update(balance);
        } else {
            //if not exists a previous balance, I'll need initialize it with income values
            await this.balanceRepository.store({
                user_id: entry.user_id,
                amount: entry.amount,
            } as Balance);
        }
    }

    private async outcome(entry: MovementCreateDto, balance: Balance | null): Promise<void> {
        if (balance && balance.amount >= entry.amount) {
            await this.movementRepository.store(entry as Movement);
            balance.amount -= entry.amount;
        } else {
            //if not exists a balance or outcome amount is grather than balance amount, can't do this operation
            throw new ApplicationExceptions('User does not have enought balance.');
        }
        await this.balanceRepository.update(balance);
    }
}