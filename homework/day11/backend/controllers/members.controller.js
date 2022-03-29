// 하위 서비스에서 import 할 수 있는 것들 import 해야함~
// 회원조회 컨트롤러

export class MembersController{
     getMembersList = async (req,res) => {
        const viewMemberList = await Users.find( { } )
        res.send(viewMemberList)
        res.send("회원목록을 조회합니다.")
    }
}