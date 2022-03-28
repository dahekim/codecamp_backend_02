const aaa = new Date()
console.log(aaa.getFullYear())
console.log(aaa.getMonth()+1)           //month는 0부터 시작해서 +1 해줘야 우리가 아는 그 월로 볼 수 있음



class Monster{
    power = 10

    constructor( a ){          // constructor : 생성자, 제일 처음에 한 번 시작되는 것, 생성자에 new Monster('~') < 괄호 안에 있는 '~' 값이 들어간다 
        this.power = a
    }

    attack = () => {
        console.log("공격하자!!")       // 화살표 방식
        console.log(`내 공격력은 ${this.power}!`)           // 현재 클래스에 있는 객체 혹은 메소드를 사용하려면 this.를 앞에 붙여야 한다
    }  
    run = () => {
        console.log("도망가자!!")
    }
}

const mymonster1 = new Monster(5)
mymonster1.attack()
mymonster1.run()

const mymonster2 = new Monster(50)          // 값을 넣을 수 있음, 클래스 안에 있는 생성자에 이 값이 들어간다...
mymonster2.attack()
mymonster2.run()

/*
const loginService = new LoginService()
loginService.login()
loginService.logout()
loginService.loginCheck()
*/