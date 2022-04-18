// graphql 쓴다면 한겹 더 발라야함ㅎㅎ;;
import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport'

export class GqlAccessGuard extends AuthGuard('access'){
    getRequest(context: ExecutionContext ){
        const ctx = GqlExecutionContext.create(context)
        return ctx.getContext().req
    }
}

export class GqlAuthRefreshGuard extends AuthGuard('refresh'){
    getRequest(context: ExecutionContext ){
        const ctx = GqlExecutionContext.create(context)
        return ctx.getContext().req
        // jwt-refresh.strategy.ts의 req로 간다
    }
}