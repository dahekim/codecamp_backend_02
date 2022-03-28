// 회원조회 컨트롤러

export class MembersController{
     getMembersList = async (req,res) => {
        const viewMemberList = await Users.find( { } )
        res.send(viewMemberList)
        res.send("회원목록을 조회합니다.")
    }
}