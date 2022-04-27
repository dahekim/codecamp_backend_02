// import { AppController } from './app.resolver'
import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { AppResolver } from './app.resolver'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "src/common/graphql/schema.gql",
    }),
  ],
  providers: [AppService , AppResolver ],
})
export class AppModule {}
