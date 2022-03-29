// 타입추론
let aaa = "안녕하세요";
aaa = 3;

// 타입명시
let bbb: string = "반갑습니다";
bbb = 10;

// 문자타입
let ccc: string; // 형식 할당은 나중에 해도 괜찮아~
ccc = "반가워요";
ccc = 3;

// 숫자타입
let ddd: number;
ddd = "피곤해요";

// 불린타입
let eee: boolean;
eee = true;
eee = false;
eee = "false";
// 문자열은 true이기 때문에 true로 작동함

// 배열타입
let fff: number[] = [1, 2, 3, 4, 5, "토끼"];

let ggg: string[] = ["토끼", "딸기", "펭귄", 718];

// 서로 다른 타입을 같은 배열에 넣고 싶으면?
let hhh: (number | string)[] = ["이태민", 718, "김기범", 923];

// 객체타입
interface Iprofile {
  // 타입 생성
  name: string;
  birthday: number | string;
  hometown: string;
  hobby?: string; //지금은 없지만 나중엔 있을 수도~ 없을 수도~ 있는 key일 때 '?' 붙이기!
}

let profile: Iprofile = {
  // Iprofile 타입 부여
  name: "최민호",
  birthday: 1209,
  hometown: "인천",
};

profile.birthday = "12월 9일";
profile.hometown = 181;
profile.hobby = "축구";

// 함수
// 받는 쪽에 할당된 타입 중심으로, 타입 부여 안하면 타입 추론이 안된다~ any로 취급됨
// ()뒤에 :~ <= return의 타입 지정
const add = (money1: number, money2: number, unit: string): string => {
  return money1 + money2 + unit;
};

add(1000, 3000, "원");
add("100", "200", "원");
