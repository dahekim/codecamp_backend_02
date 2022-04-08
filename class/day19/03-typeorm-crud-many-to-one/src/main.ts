import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './commons/filter/http-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new HttpExceptionFilter)
    // class여서 앞에 new 붙임, 앞으로 발생하는 에러는 여기서 catch 로 잡고 exception으로 떨궈줄거야~ 
    // 매 api마다 try/catch 걸 일이 없어진다!
    await app.listen(3000);
}
bootstrap();
