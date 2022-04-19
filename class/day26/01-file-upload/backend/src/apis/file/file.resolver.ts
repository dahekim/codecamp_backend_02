import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { FileService } from "./file.service";
import { FileUpload, GraphQLUpload } from'graphql-upload'

@Resolver()
export class FileResolver{
    constructor(
        private readonly fileService: FileService,
    ){}

    @Mutation( () => [String] )
    uploadFile(
        @Args({name: 'files', type: () => [GraphQLUpload] }) files : FileUpload[],
        // 브라우저에서 받아올 때는 GraphQLUpload 타입
        // service로 넘어갈 때는 FileUpload 타입이라고 명시
    ){
        console.log(files)
        return this.fileService.upload({ files })
    }
}