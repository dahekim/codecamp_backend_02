
const fetchData = async() => {
    console.time("=== 개별 Promise 각각 수행 ===")
    const result1 = await new Promise((resolve, reject)=> {        
        setTimeout(() => {
            resolve("⭕️ 성공시 받는 데이터")
        }, 2000)
    })

    const result2 = await new Promise((resolve, reject)=> {        
        setTimeout(() => {
            resolve("⭕️ 성공시 받는 데이터")
        }, 3000)
    })

    const result3 = await new Promise((resolve, reject)=> {        
        setTimeout(() => {
            resolve("⭕️ 성공시 받는 데이터")
        }, 1000)
    })
    console.timeEnd("=== 개별 Promise 각각 수행 ===")
}

const fetchData2 = async () => {
    console.time("=== 동시에 Promise.all ===")
    await Promise.all( [ 

        new Promise((resolve, reject)=> {        
            setTimeout(() => {
                resolve("⭕️ 성공시 받는 데이터")
            }, 2000)
        }),

        new Promise((resolve, reject)=> {        
            setTimeout(() => {
                resolve("⭕️ 성공시 받는 데이터")
            }, 3000)
        }),

        new Promise((resolve, reject)=> {        
            setTimeout(() => {
                resolve("⭕️ 성공시 받는 데이터")
            }, 1000)
        })
    ])
    console.timeEnd("=== 동시에 Promise.all ===")
}

fetchData()
fetchData2()