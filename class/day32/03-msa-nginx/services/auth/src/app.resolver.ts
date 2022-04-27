import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Mutation( ()=>String )
  login(){
    return "login complete!"
  }

  @Query(()=> String)
  rabbit(){
    return '🐰🐰🐰'
  }
}
