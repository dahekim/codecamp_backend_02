import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/')
    getHello(): string {
        console.log("ㅡㅡ")
        console.log("악악")
        console.log("짜증!")
        return this.appService.aaa();
    }
}
