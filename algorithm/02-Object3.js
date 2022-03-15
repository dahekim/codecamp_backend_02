const student = {
  name:"철수",
  age:"8"
}

const school ={
  name:"다람쥐초등학교",
  teacher:"다람이"
}

//student.school = school 
student["school"] = school
console.log(student) //객체를 또다른 객체 안에 할당

