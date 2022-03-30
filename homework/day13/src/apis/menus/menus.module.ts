import { Module } from '@nestjs/common';

import { MenuResolver } from './menus.resolver';
import { MenuService } from './menus.service';

@Module({
    providers: [MenuService, MenuResolver],
})
export class MenuModule {}
