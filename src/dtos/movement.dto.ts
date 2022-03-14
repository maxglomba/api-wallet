
interface MovementCreateDto {
    id: number;
    user_id: number;
    type: number;
    amount: number;
}

interface MovementUpdateDto {
    user_id: number;
    type: number;
    amount: number;
}