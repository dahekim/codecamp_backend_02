// new Promise((resolve, reject)=> {
//     // 특정 작업
//     // if(success){
//     //     resolve("⭕️ 끝!")
//     // }

//     // if(fail){
//     //     reject("‼️에러발생!")
//     // }
// }).then( res => {} ).catch( err => {} )



const fetchData = async() => {
    const result = await new Promise((resolve, reject)=> {
        // 특정 작업 (ex. 스토리지로 보내는 API)
        // 외부에 데이터를 보내고 받는데 2초가 걸림
        
        setTimeout(() => {
            try{
                resolve("⭕️ 성공시 받는 데이터")
            } catch(error){
                reject("⛔️ 실패!")
            }
        }, 2000)
    
    })
    // .then( (res) => console.log(res) )
    console.log(result)
}
fetchData()