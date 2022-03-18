// 목록에서 "의류"를 구매한 횟수와 총 금액을 나타내고,
// 의류를 구매한 횟수에 따라 등급을 나타내세요.

// 등급표: "0~2" : Bronze, "3~4" : Silver, 5회 이상 : GOLD

// 입력인자 X
// 반복문을 통해서 문제를 풀어야 합니다.
// myShopping 내용을 직접 수정하면 안 됩니다.
// 예상 결과에 나온 문구와 형식이 같아야 합니다.
// '의류를 구매한 횟수는 총 5회 금액은 57000원이며 등급은 Gold입니다.'

const myShopping = [
	{ category: "과일", price: 12000　},
	{ category: "의류", price:10000　 },
	{ category: "의류", price: 20000　},
	{ category: "장난감", price: 9000 },
	{ category: "과일", price: 5000　 },
	{ category: "의류", price: 10000  },
	{ category: "과일", price: 8000　　},
	{ category: "의류", price: 7000　　},
	{ category: "장난감", price: 5000  },
	{ category: "의류", price: 10000　 },
]

let count=0		// 구매 회수
let total=0		// 총 금액
let grade=''	//최종 등급


for(let i = 0; i<myShopping.length; i++){
  if(myShopping[i].category === "의류"){
    count += +1
    total += myShopping[i].price  
  }
}

if(count>=5){
  grade="Gold"
}
else if(count >=3){
  grade="Silver"
}
else if(count>=0){
  grade="Bronze"
}

console.log(`의류를 구매한 횟수는 총 ${count}회, 금액은 ${total}원이며 등급은 ${grade}입니다.`)