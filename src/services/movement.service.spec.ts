import assert = require('assert');
import { MovementService } from './movement.service';

import { MovementMOCKRepository } from './repositories/impl/mock/movement.repository';
import { BalanceMOCKRepository } from './repositories/impl/mock/balance.repository';
import { MovementCreateDto } from '../dtos/movement.dto';

const movementService = new MovementService(
    new MovementMOCKRepository(),
    new BalanceMOCKRepository()
);

describe('Movement.Service', () => {
    describe('Store', () => {
        it('tries to register an income request', async () => {
            await movementService.store({
                user_id: 1,
                type: 0,
                amount: 200
            } as MovementCreateDto);

        });

        it('tries to register an outcome request', async () => {
            await movementService.store({
                user_id: 1,
                type: 1,
                amount: 300
            } as MovementCreateDto);
        });

        it('tries to register an outcome request with insuficient founds', async () => {
            try {
                await movementService.store({
                    user_id: 1,
                    type: 1,
                    amount: 10000
                } as MovementCreateDto);
            } catch (error: any) {
                assert.equal(error.message, 'User does not have enought balance.');
            }

        });

        it('tries to register an unexpected movement code', async () => {
            try {
                const movement = {
                    user_id: 1,
                    type: 9999,
                    amount: 10000
                };
                await movementService.store(movement as MovementCreateDto);
            } catch (error: any) {
                assert.equal(error.message, 'Invalid movement type supplied.');
            }
        });

    });
});