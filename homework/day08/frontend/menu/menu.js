// 커피 목록 조회 API를 요청해주세요.
function getCoffee(){
  axios.get("http://localhost:3001/starbucks",{})
  .then((res) => {
    console.log(res.data)
    for (let i =0 ; i < 10; i++ ){
      createMenuCard(res.data[i])
    }
    })  
}

const createMenuCard = (data) => {
  const menuCardWrapper = document.createElement('div')
  menuCardWrapper.className = 'Menu_Card_Wrapper'

  const menuCardImgBox = document.createElement('div')
  menuCardImgBox.className = 'Menu_Card_ImgBox'

  const menuCardName = document.createElement('div')
  menuCardName.className = 'Menu_Card_Name'
  menuCardName.textContent = data?.name || '메뉴이름'

  const menuCardInfo = document.createElement('div')
  menuCardInfo.className = 'Menu_Card_Info'
  menuCardInfo.textContent = data?.kcal || '칼로리'

  const menuWrapper = document.querySelector('#Menu_Background')
  menuCardWrapper.appendChild(menuCardImgBox)
  menuCardWrapper.appendChild(menuCardName)
  menuCardWrapper.appendChild(menuCardInfo)
  menuWrapper.appendChild(menuCardWrapper)

}
