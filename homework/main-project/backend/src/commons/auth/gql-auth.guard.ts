// graphql 쓴다면 한겹 더 발라야함ㅎㅎ;;
import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport'

export class GqlAuthAccessGuard extends AuthGuard('access'){
    getRequest(context: ExecutionContext ){
        // RestAPI에 맞춰져 있는 context를 graphql 용으로 변환해야 한다~ 
        const ctx = GqlExecutionContext.create(context)
        console.log(ctx)

        // GraphQL용 context의 request를 뽑아서 리턴
        return ctx.getContext().req
    }
}