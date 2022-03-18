import { MovementType } from '../common/enums/movement-types';

interface MovementCreateDto {
    id: number;
    user_id: number;
    type: MovementType;
    amount: number;
}

export {
    MovementCreateDto
};