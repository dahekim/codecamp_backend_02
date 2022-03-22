//assignment
/*
{
    nickname: "뚜비",
    interests: ["방탈출","테니스","멍 때리기"],
    bio: "제 닉네임은 뚜비입니다. 취미는 방탈출,테니스,멍 때리기입니다."
}
*/

const handleEdit = (nickname, interests) => {
    let arr = interests.split(',').map((e) => e.trimStart()).join(',')
    
    
      const handleObj = {
          // 아래에 코드를 작성해주세요.
          nickname  : nickname,
          interests : interests.split(',').map((e)=>e.trim()),
          bio       : `제 닉네임은 ${nickname}입니다. 취미는 ${arr}입니다.`
          }
      
      return handleObj;
    }
    
    module.exports = handleEdit;