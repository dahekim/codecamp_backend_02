import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { GraphQLModule } from '@nestjs/graphql'
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo'
import { IntrospectAndCompose } from '@apollo/gateway'

@Module({
  imports: [
    // 게이트웨이 타입 지정
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      gateway: {
        // 게이트웨이 생성
        supergraphSdl: new IntrospectAndCompose({
          subgraphs:[
            { name : "auth", url : "http://auth-service:3001/graphql", },
            { name : "resource", url : "http://resource-service:3002/graphql",}
          ]
        })
      },
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
