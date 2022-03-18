// 입력되는 score에 따라 알맞은 등급을 적어야 합니다.
// 100~90 => "A", 89~80 => "B", 79~70 => "C", 69~60 => "D",
// 59~0 => "F", 100점을 초과하거나 0점 미만은 "잘못된 점수입니다." 메시지 출력

//score은 숫자열입니다.

let score = []

function grade(score){
	if(score>=90 && score<=100){
		return score = "A"
		}
	else if(score>=80){
		return score = "B"
	}
	else if(score>=70){
		return score = "C"
	}
	else if(score>=60){
		return score = "D"
	}
	else if(score>=0 && score<=59){
		return score = "F"
	}
	else{
		console.log("잘못된 점수입니다.")
	}

}