import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
    findAll() {
        // DB에 접속해서 데이터를 꺼내오는 로직
        return [
            {
                number: 1,
                title: '1빠',
                writer: '다혜',
                contents: '1빠!',
            },
            {
                number: 2,
                title: '2빠',
                writer: '다혜',
                contents: '2빠!!',
            },
            {
                number: 3,
                title: '3빠',
                writer: '다혜',
                contents: '3빠!!!',
            },
        ];
    }

    create() {
        // DB에 접속해서 데이터를 DB에 등록하는 로직
        return '등록에 성공했습니다!';
    }
}
