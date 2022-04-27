import { Controller, Get, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService : AppService,
    // app.module.ts 에서 생성한 AUTH_SERVICE 주입
    @Inject("AUTH_SERVICE")
    private readonly clientAuthService : ClientProxy,

  // app.module.ts 에서 생성한 RESOURCE_SERVICE 주입
    @Inject("RESOURCE_SERVICE")
    private readonly clientResourceService : ClientProxy,
    ) {}

  // api 시작점 생성
  @Get("/auth/login")
  login(){
    return this.clientAuthService.send({ cmd:"auth" }, {name: "철수"})
  }
  @Get("/boards") 
  fetchBoards(){
    return this.clientResourceService.send({ cmd: "resource" }, { age: 13 })
  }
}
