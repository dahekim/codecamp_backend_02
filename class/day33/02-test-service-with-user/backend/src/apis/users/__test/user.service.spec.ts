import { ConflictException } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm"

import { User } from "../entities/user.entity"
import { UserService } from "../user.service"

class MockUserRepository {
    // 배열로 dummy data 생성, 객체 하나가 db 한 줄과 같은 역할 
    mydb = [
        { email: "a@a.com", password: "qwer1234", name: "짱구", age: 8 },
        { email: "b@b.com", password: "0000", name: "철수", age: 8 },
        { email: "c@c.com", password: "8250", name: "유리", age: 8 },
    ]
    findOne({ email }){
        const users =  this.mydb.filter( (el) => el.email === email )
        if(users.length) return users[0]
        return null
    }

    save({ email, password, name, age }) {
        this.mydb.push({ email, password, name, age })
        return { email, password, name, age }
    }
}

describe( "UserService" , () => {
    let userService : UserService

    beforeEach(async() => {
        // User의 Repository를 원본으로 해서 테스트용 UserRepository 생성
        const userModule = await Test.createTestingModule({
            providers : [ 
                UserService,
                { 
                    provide : getRepositoryToken(User) ,
                    useClass : MockUserRepository ,
                }, 
            ], 
        }).compile()
        userService = userModule.get<UserService>(UserService)
    })
    
    describe("create", () => {
        it("이메일 존재 여부 검증", async () => {
            const myData = { email: "a@a.com", hashedPassword: "0000", name: "철수", age: 8 }
            try {
                await userService.create({ ...myData })
            } catch(error) {
                expect(error).toBeInstanceOf(ConflictException)
            }
        })

        it("회원등록 성공 여부 검증", async () => {
            const myData = { email : "d@d.com", hashedPassword : "2468", name : "짱아" , age : 3 }
            const myResultData = { email : "d@d.com", password : "2468", name : "짱아" , age : 3 }
            const result = await userService.create({...myData})

            // 객체나 배열은 엄격하게 비교해서 다 일치해야 한다!
            expect(result).toStrictEqual(myResultData)
        })
    })

    describe("findOne", () => {

    })
})