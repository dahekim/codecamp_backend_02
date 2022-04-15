// 프로그래머스 : https://programmers.co.kr/learn/courses/30/lessons/64061


function solution(board, moves) {
    let answer = 0      // 터트려져 사라진 인형의 갯수
    const bucket = []   // 인형을 순서대로 담을 바구니
    
    // 1. 크레인이 이동하는 위치값을 구하는 반복문
        for(let i = 0; i<moves.length; i++){
            // 2. 크레인이 이동해서 뽑아올 수 있는 인형의 위치값을 구하는 반복문
            for ( let l = 0; l<board.length; l++ ){
                // 인형의 값을 저장(0 또는 1 이상 100 이하의 데이터)
                const doll = board[l][moves[i] -1]
                
                //console.log(bucket, doll)
                // 인형이 빈칸이 아니라면
                if(doll !== 0){
                    // 방금 뽑은 인형을 빈칸으로 만들어준다 
                    board[l][moves[i] - 1] = 0
                    // 바구니에 넣으려고 하는 인형이 바구니의 끝칸의 인형과 동일한지 체크
                    if ( bucket[bucket.length-1]  === doll){
                        // 바구니 맨 윗칸의 인형을 삭제
                        // bucket.pop()
                        bucket.splice(bucket.length -1,1)
                        answer+=2
                        break
                    } 
                    // 바구니에 인형을 넣는다 
                    bucket.push( doll )
                    // 방금 뽑은 인형을 빈칸으로 만들어준다 
                    board[l][moves[i] - 1] = 0
                    // 인형을 뽑으면 해당 위치의 크레인을 멈춘다
                    break
                }
            }
        }
    return answer
}

// forEach() 사용한 풀이

function solution2(board, moves) {
    let answer = 0      // 터트려져 사라진 인형의 갯수
    const bucket = []   // 인형을 순서대로 담을 바구니
    
    moves.forEach(move => {
        let stop = false
        board.forEach( location => {
            const doll = location[ move-1 ]
            if(stop === false){
                if( doll!==0 ){
                    location [ move-1 ] = 0
                    
                    // 인형이 똑같은 인형인지 확인
                    if(bucket[bucket.length -1]===doll){
                        bucket.splice( (bucket.length-1),1 )
                        answer +=2
                    }

                    else bucket.push( doll )
                    stop = true 
                }
            }
            
        })
    })
    return answer
}