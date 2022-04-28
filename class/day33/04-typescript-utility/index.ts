interface IProfile {
    name: string
    age: 13
    school: string
    hobby?: string
}

//   interface IProfile {
//       apple : string
//   }

//   // 선언 병합
//   const bbb : IProfile = { }


  // 1. Partial 타입
  // 
  type Mytype1 = Partial<IProfile>
  
  // 2. Required 타입
  // 전부 다 필수 요소!
  type Mytype2 = Required<IProfile>
  
  // 3. Pick 타입
  // name과 age만 골라줘!
  type Mytype3 = Pick<IProfile, "name" | "age">
  
  // 4. Omit 타입
  // school빼고 나머지 다 불러줘!
  type Mytype4 = Omit<IProfile, "school">
  
  // 5. Record 타입
  // 특정 조건이 있을 때, 각각의 레코드에 IProfile을 추가해주겠다 
  //  "aaa", "qqq" , "rrr" 안에 각각 name, age, school, hobby 객체가 있다!
  type ZZZ = "aaa" | "qqq" | "rrr"
  type Mytype6 = Record<ZZZ, IProfile>