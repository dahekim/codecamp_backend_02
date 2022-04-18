import { Injectable } from '@nestjs/common';
import axios from 'axios';
import 'dotenv/config';

@Injectable()
export class IamportService {
  // 1. 아임포트에서 Access Token 요청
  async getIamportAccessToken() {
    const token = await axios({
      url: 'https://api.iamport.kr/users/getToken',
      method: 'post', // POST method
      headers: { 'Content-Type': 'application/json' }, // "Content-Type": "application/json"
      data: {
        imp_key: process.env.REST_API_IMP_KEY, // REST API 키
        imp_secret: process.env.REST_API_SECRET, // REST API Secret
      },
    });
    return token.data.response.access_token;
  }

  // 2-1. 유효한 imp_uid인지 확인
  async isValidUid({ impUid, accessToken }) {
    await axios({});
  }

  // 2-2. 결제 테이블에 추가된 아이디인지 확인

  // 2-3. 이미 등록된 아이디인지 확인

  // 3. 검증이 완료된 데이터를 transaction 테이블에 추가
  async getRefund() {}

  async;
}
