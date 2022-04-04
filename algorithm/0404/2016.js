// 2016년 1월 1일은 금요일입니다. 2016년 a월 b일은 무슨 요일일까요? 
// 두 수 a ,b를 입력받아 2016년 a월 b일이 무슨 요일인지 리턴하는 함수, solution을 완성하세요. 
// 요일의 이름은 일요일부터 토요일까지 각각 SUN,MON,TUE,WED,THU,FRI,SAT입니다. 
// 예를 들어 a=5, b=24라면 5월 24일은 화요일이므로 문자열 "TUE"를 반환하세요.

// +0 = 1월 1일 : 금요일 
// +1 = 1월 2일 : 토요일 [ +1 ]
// +2 = 1월 3일 : 일요일 [ +2 ]
// +3 = 1월 4일 : 월요일 [ +3 ]
// +4 = 1월 5일 : 화요일 [ +4 ]
// +5 = 1월 6일 : 수요일 [ +5 ]
// +6 = 1월 7일 : 목요일 [ +6 ]
// +7 = 1월 8일 : 금요일 [ +0 ]


const month = {
    1 : 31,
    2 : 29,
    3 : 31,
    4 : 30,
    5 : 31,
    6 : 30,
    7 : 31,
    8 : 31,
    9 : 30,
    10 : 31,
    11 : 30,
    12 : 31
}

const week = [ "FRI","SAT", "SUN", "MON", "TUE", "WED", "THU" ]

function solution (a,b){
    // a월 b일 까지 해당되는 모든 일수를 저장
    let answer = 0

    for ( let i = 1; i < a ; i++ ){
        // 1월부터 a월 전까지의 모든 월의 일수를 더한다.
        answer += month[i]
    }
    // 당일 제외
    answer += ( b-1 )

    answer = week [ answer % 7 ]
    return answer
}

// reduce() 메소드 사용
// 왜? 모든 일수 값을을 더한 값을 사용하기 위해 reduce를 사용

function solution (a,b){
    let answer = new Array ( a )
    .fill(1)
    .reduce( ( acc,cur,i ) => {
        const mn = cur + i 
        return acc + ( mn !== a         // 이전 월일 경우 (1,2,3,4)  
            ? month[mn]
            : b - 1                     // 해당 월일 경우는  : ~    
        )                   

    }, 0)

    return week[answer % 7 ]
}

// new Date(), getDay() 사용

const week_2 = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
function solution (a,b){
    const answer = new Date(2016 , a-1 , b).getDay()     // 월의 초기 값은 -1이 되게 설정
    return week_2[answer]
}