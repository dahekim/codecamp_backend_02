import { Module } from '@nestjs/common';

import { StarbucksResolver } from './menus.resolver';
import { StarbucksService } from './menus.service';

@Module({
    providers: [StarbucksService, StarbucksResolver],
})
export class StarbucksModule {}
