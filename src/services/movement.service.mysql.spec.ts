import assert from 'assert';
import { MovementService } from './movement.service';

//set environment vars
import Environment from '../common/tests/env.test';
const environment = new Environment();
environment.set();

import { MovementMySQLRepository } from './repositories/impl/mysql/movement.repository';
import { BalanceMySQLRepository } from './repositories/impl/mysql/balance.repository';
import { MovementCreateDto } from '../dtos/movement.dto';

const BD = 'MSSQL';

const movementService = new MovementService(
    new MovementMySQLRepository(),
    new BalanceMySQLRepository()
);


describe(BD + '- Movement.Service', () => {
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
                amount: 100
            } as MovementCreateDto);
        });

        it('tries to register an outcome request with insuficient founds', async () => {
            try {
                await movementService.store({
                    user_id: 1,
                    type: 1,
                    amount: 10000
                } as MovementCreateDto);
            } catch (error) {
                let errorMessage = 'An exceptional error has ocurred';
                if(error instanceof Error){
                    errorMessage = error.message;
                }
                assert.equal(errorMessage, 'User does not have enought balance.');
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
            } catch (error) {
                let errorMessage = 'An exceptional error has ocurred';
                if(error instanceof Error){
                    errorMessage = error.message;
                }
                assert.equal(errorMessage, 'Invalid movement type supplied.');
            }
        });

    });
});