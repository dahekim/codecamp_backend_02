import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/aaa')
    getHello(money1: number, money2: number, unit): string {
        return this.appService.aaa();
    }
}
