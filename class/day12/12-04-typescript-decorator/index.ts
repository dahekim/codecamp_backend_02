function zzz(aaa) {
  console.log("=======");
  console.log(aaa);
  console.log("=======");
}

@zzz
class AppController {}

class Aaa {
  constructor(public power) {
    this.power = 10;
  }
  ggg() {
    // this.power = 10;
    console.log("안녕하세요");
  }
}
const aaa = new Aaa(50);
aaa.power = 5; // aaa가 가지고 있는 power(50)을 5로 바꾸면? 50이 constructor가 들어갔는데 어떻게 되는 거야?

//private
class Bbb {
  constructor(private power) {}
  ggg() {
    this.power = 10; //constructor 안에 안 넣어줬는데도 쓸 수 있음
    console.log("반가워요");
  }
}
const bbb = new Bbb(50);
//bbb.power;
// private은 안에서만 쓸 수 있음//private

//read only (읽기전용)
class Ccc {
  constructor(readonly power) {}
  ggg() {
    this.power = 10;
    console.log("반가워요");
  }
}
const ccc = new Ccc(50);
