const fruits = ["사과", "바나나", "파인애플"]
console.log(fruits) //[ '사과', '바나나', '파인애플' ]

let newFruits = []
newFruits.push(fruits[fruits.length-1])
console.log(newFruits) //'파인애플'

//###########
// 멘토님 풀이
//###########

/*

const fruits = ["사과", "바나나", "파인애플"]

fruits[0] //'사과'
fruits[1] //'바나나'
fruits[fruits.length-1] //'파인애플'

const newFruits=[];
newFruits.push(fruits[fruits.length -1])
newFruits 	// '파인애플'

*/