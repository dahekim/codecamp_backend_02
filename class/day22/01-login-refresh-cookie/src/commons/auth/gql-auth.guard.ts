// graphql 쓴다면 한겹 더 발라야함ㅎㅎ;;
import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport'

export class GqlAccessGuard extends AuthGuard('access'){
    getRequest(context: ExecutionContext ){
        // context... 헤더 등등~ 
        // AuthGuard는 RestAPI에 맞춰져 있기 때문에 context를 graphql 용으로 변환해야 한다~ 
        const ctx = GqlExecutionContext.create(context)
        // console.log(ctx)

        // GraphQL용 context의 request를 뽑아서 리턴
        return ctx.getContext().req
    }
}