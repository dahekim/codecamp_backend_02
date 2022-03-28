// 땅을 기어다니는 몬스터 
class GroundUnit{
    constructor(qqq){
        
    }
    run  =() => {
        console.log("뛰어서 도망가자!")
    }
}


// 날아다니는 몬스터
class SkyUnit {
    constructor(){
        
    }
    run = () => {
        console.log("날아서 도망가자!")
    }
}


// 기본 클래스 생성, 공격만 할 줄 아는 몬스터 (extends ~ 쓰기 전에)
// SkyUnit에서 상속을 받아서 날아다니는 몬스터 속성을 가지게 됨 
class Monster extends GroundUnit {
    power = 10
    constructor(aaa){
        super(300)
    }

    attack = () => {
        console.log("공격!")
        console.log(`내 공격력은 ${this.power}!`)
    }
}


const mymonster1 = new Monster()
mymonster1.attack()
mymonster1.run()

//로그 안찍히는데??



