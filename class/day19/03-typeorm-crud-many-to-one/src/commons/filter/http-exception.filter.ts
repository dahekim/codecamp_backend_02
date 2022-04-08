import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'

// 데코레이터 작성 해야 알아보고 잡아둠~
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost) {
        //nestjs에서 에러가 나면 catch에서 잡아준다

        // 상태코드 얻어옴
        const status = exception.getStatus()
        // 무슨 메시지가 왔는지 알려줘
        const message = exception.message
        console.log("===================================")
        console.log("에러가 발생했습니다!")
        console.log("에러내용 : "+ message)
        console.log("에러코드 : "+ status)
        console.log("===================================")
    }
}
