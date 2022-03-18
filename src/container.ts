import express = require('express');
import { createContainer, asClass } from 'awilix';
import { scopePerRequest } from 'awilix-express';

// import { SubscriptionMySQLRepository } from './services/repositories/impl/mysql/subscription.repository';
// import { BalanceMySQLRepository } from './services/repositories/impl/mysql/balance.repository';
// import { MovementMySQLRepository } from './services/repositories/impl/mysql/movement.repository';

import { SubscriptionMSSQLRepository } from './services/repositories/impl/mssql/subscription.repository';
import { BalanceMSSQLRepository } from './services/repositories/impl/mssql/balance.repository';
import { MovementMSSQLRepository } from './services/repositories/impl/mssql/movement.repository';

import { TestService } from './services/test.service';
import { SubscriptionService } from './services/subscription.service';
import { BalanceService } from './services/balance.service';
import { MovementService } from './services/movement.service';

export default ( app: express.Application) => {

    const container = createContainer({
        injectionMode: 'CLASSIC'
    });

    container.register({
        //repositories
        // MSSQL
        subscriptionRepository: asClass(SubscriptionMSSQLRepository).scoped(),
        balanceRepository: asClass(BalanceMSSQLRepository).scoped(),
        movementRepository: asClass(MovementMSSQLRepository).scoped(),

        // MYSQL
        // subscriptionRepository: asClass(SubscriptionMySQLRepository).scoped(),
        // balanceRepository: asClass(BalanceMySQLRepository).scoped(),
        // movementRepository: asClass(MovementMySQLRepository).scoped(),

        //services
        subscriptionService: asClass(SubscriptionService).scoped(),
        balanceService: asClass(BalanceService).scoped(),
        movementService: asClass(MovementService).scoped(),
        testService: asClass(TestService).scoped()
    });
    
    app.use(scopePerRequest(container));
};