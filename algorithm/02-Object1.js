const Obj={
  name: "철수",
  age: 12,
  school:{
  	name:"다람쥐초등학교"
	}
}
//###################################################
let a = "name"

Obj.name // 키 값의 이름을 정확하게 입력
Obj[a] // [ ] 로는 키 값을 어떠한 변수의 기대값으로 접근할 때 사용, 
			//키 값의 이름을 직접 입력할 수도 있고 키 값을 가지고 있는 변수를 넣어서 사용할 수도 있음 

Obj.age
Obj["age"]

//###################################################

Obj.dog="똘이"
console.log(Obj)

Obj.dog="별이"
console.log(Obj) 	// 같은 key 값이 있기 때문에 추가X, 데이터가 변경됨

Obj.school.teacher="훈이"
console.log(Obj)		// 객체 안의 객체를 가져오기 위해서 ~.~ .

Obj.cat="별이"
console.log(Obj) // 같은 key 값이 없어서 추가됨

delete Obj.age
console.log(Obj)		//객체 데이터 삭제

delete Obj.school.name
console.log(Obj)		//객체in객체 데이터 삭제

delete Obj.school
console.log(Obj)		//배열이 들어있는 객체 삭제


