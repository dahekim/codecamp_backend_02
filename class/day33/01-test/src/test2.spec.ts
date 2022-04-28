import { AppController } from "./app.controller"
import { AppService } from "./app.service"

describe( "AppController" , () => {
    // describe의 테스트에서 사용할 getHello를 만들어서 아래로 넘겨주자~
    // 같은 경로에 있는 AppController를 통째로 하나 만든 것! 
    // 컨트롤러에 주입해주기 위해 AppService도 새로 생성
    let appService: AppService
    let appController: AppController

    beforeEach(()=>{        
        appService = new AppService()
        appController = new AppController(appService)

    })

    describe("getHello", () => {
        it("이 테스트의 검증 결과는 Hello World를 리턴해야 합니다.", () => {
            // getHello() 실행해야 한다!
            const result = appController.getHello()
            expect(result).toBe("Hello World!")
        })
    })
})