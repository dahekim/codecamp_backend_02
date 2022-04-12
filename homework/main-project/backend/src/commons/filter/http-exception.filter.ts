import { ArgumentsHost, Catch,  ExceptionFilter, HttpException } from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost) {

        const status = exception.getStatus()
        const message = exception.message

        console.log("===================================")
        console.log("에러가 발생했습니다!")
        console.log("에러내용 : "+ message)
        console.log("에러코드 : "+ status)
        console.log("===================================")
    }
}