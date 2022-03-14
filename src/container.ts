import express = require('express');
import { createContainer, asClass } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import { TestService } from './services/test.service';
import { SubscriptionMySQLRepository } from './services/repositories/impl/mysql/subscription.repository';
import { SubscriptionService } from './services/subscription.service';
import { BalanceMySQLRepository } from './services/repositories/impl/mysql/balance.repository';
import { MovementMySQLRepository } from './services/repositories/impl/mysql/movement.repository';
import { BalanceService } from './services/balance.service';
import { MovementService } from './services/movement.service';

export default ( app: express.Application) => {

    const container = createContainer({
        injectionMode: 'CLASSIC'
    });

    container.register({
        //repositories
        subscriptionRepository: asClass(SubscriptionMySQLRepository).scoped(),
        balanceRepository: asClass(BalanceMySQLRepository).scoped(),
        movementRepository: asClass(MovementMySQLRepository).scoped(),

        //services
        subscriptionService: asClass(SubscriptionService).scoped(),
        balanceService: asClass(BalanceService).scoped(),
        movementService: asClass(MovementService).scoped(),
        testService: asClass(TestService).scoped()
    });
    
    app.use(scopePerRequest(container));
};