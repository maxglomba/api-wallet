import { Balance } from './repositories/domain/balance';
//este dominio es una interface con todos los campos que se extraen de la base de datos
import { BalanceRepository } from './repositories/balance.repository';

export class BalanceService {
    constructor(
        private readonly balanceRepository: BalanceRepository
        //aca se esta inyectando la dependencia que hice de la implementacion del repositorio pero casteado como la interface que use para crearlo
        //de esta manera esta abstraido, y de querer cambiarlo solamente cambio la dependencia cuando la registro y todo sigue funcionando
        //con otra implementacion del repositorio
    ) {}

    public async find(id: number): Promise<Balance | null> {
        return await this.balanceRepository.find(id);
    }

    public async findByUserId(user_id: number): Promise<Balance | null> {
        return await this.balanceRepository.findByUserId(user_id);
    }

    public async all(): Promise<Balance[]> {
        return await this.balanceRepository.all();
    }
    

}