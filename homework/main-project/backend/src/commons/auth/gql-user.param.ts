import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";


// 프론트에서 받은 데이터와 헤더에서 온 것...들...
// 데코레이터 만들기
export const CurrentUser = createParamDecorator(
    (data: any, context: ExecutionContext)=> {
        const ctx = GqlExecutionContext.create(context)
        return ctx.getContext().req.user    
})