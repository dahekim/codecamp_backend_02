import { ConflictException, HttpException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import axios from 'axios';
import 'dotenv/config';

@Injectable()
export class IamportService {
  // 1. 아임포트에서 Access Token 요청
  async getIamportAccessToken() {
    try{
      const token = await axios.post('https://api.iamport.kr/users/getToken', {
      imp_key: process.env.REST_API_IMP_KEY,
      imp_secret : process.env.REST_API_SECRET,})
      
      console.log("⭕️ 토큰이 생성되었습니다. :" + token.data.response.access_token)
      return token.data.response.access_token

    } catch (error){
      console.log(`⛔️ 에러 발생! ${error.response.data.message}`)
      throw new HttpException(
        error.response.data.message,
        error.response.status,
      )}
  }
  async isExist({ impUid, accessToken, amount }){
    try{
      const result = await axios.get
      (`https://api.import.payments/${impUid}`,
      { headers: {Authorization: accessToken} },
      )
      if (result.data.response.status !== "paid")
        throw new ConflictException("결제 내역이 존재하지 않습니다.")
      if(result.data.response.amount !== amount)
        throw new UnprocessableEntityException("결제 금액이 잘못되었습니다.")
    } catch (error){
      if(error?.response?.data?.message){
        throw new HttpException(
          error.response.data.message,
          error.response.status,
          )
        } else {
          throw error
        }
      }}
    
}