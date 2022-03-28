// 최소한 3개의 변수(기종, 마력, 색깔)이 포함되어야 합니다.
// 최소한 2개의 메소드(출발하기, 정지하기)가 포함되어야 합니다.

class Car{
    hp = 95
    color = "검정" 
    model = "veloster"

    // 출발 메소드
    start = () => {
        console.log(`${this.hp}의 마력을 가진 ${this.color} ${this.model} 출발!`)
    }

    // 정지 메소드
    stop = () => {
        console.log(`${this.color} ${this.model} 정지!`)
    }
}

const car1 = new Car()
car1.start()
car1.stop()