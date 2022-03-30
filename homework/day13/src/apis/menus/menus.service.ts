import { Injectable } from '@nestjs/common';

@Injectable()
export class MenuService {
    findAll() {
        // DB에 접속해서 데이터를 꺼내오는 로직
        return [
            {
                name: "나이트로 바닐라 크림",
                price: 8000,
                kcal: 80,
                fat:3, 
                protein:1, 
                Na:40,
                sugars: 10,
                caffein: 232,
            },
            {
                name: "아이스 카페 아메리카노",
                price: 4500,
                kcal: 10,
                fat: 0, 
                protein: 1, 
                Na: 5,
                sugars: 0,
                caffein: 150,
            },
            {
                name: "카페라떼",
                price: 5200,
                kcal: 180,
                fat: 5, 
                protein:10, 
                Na:115,
                sugars:13,
                caffein:75,
            },
            {
                name: "모카 프라푸치노",
                price: 7000,
                kcal: 280,
                fat: 6, 
                protein: 5, 
                Na: 180,
                sugars: 36,
                caffein: 90,
            },
            {
                name: "망고 패션 프루트 블렌디드",
                price: 6800,
                kcal: 120,
                fat: 0, 
                protein: 1, 
                Na:70,
                sugars: 25,
                caffein: 35,
            }
        ];
    }

    create() {
        // DB에 접속해서 데이터를 DB에 등록하는 로직
        return '등록에 성공했습니다!';
    }
}
