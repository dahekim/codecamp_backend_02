import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { Test } from "@nestjs/testing"

class MockAppService {
    getHello() {
        return "Hello World!"
    }
}

describe( "AppController" , () => {
    let appController: AppController

    beforeEach(async() => {        
        const appModule = await Test.createTestingModule({
            controllers : [ AppController ],
            providers : [{
                provide: AppService,    // 원본
                useClass: MockAppService,   // 대신에 이거 써줘! 
            }, 
        ], 
        }).compile()
        
        appModule.get<AppController>( AppController )
        appController = appModule.get<AppController>( AppController )
    })
    // app.service.ts에 있는 원래의 getHello가 실행되는 것이 아니라
    // 위에서 만든 MockAppService가 주입되어서 실행된다!
    describe("getHello", () => {
        it("이 테스트의 검증 결과는 Hello World를 리턴해야 합니다.", () => {
            const result = appController.getHello()
            expect(result).toBe("Hello World!")
        })
    })

})