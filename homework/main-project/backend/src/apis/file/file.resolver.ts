import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { GraphQLUpload, FileUpload } from 'graphql-upload'
import { FileService } from "./file.service";


@Resolver()
export class FileResolver{
    constructor(
        private readonly fileService : FileService
    ){}

    @Mutation(() => [String])
    uploadFile(
        @Args({name: 'files', type: () => [ GraphQLUpload ] }) files: FileUpload[]
        // 브라우저에서 받아올 때는 GraphQLUpload 타입
        // service로 넘어갈 때는 FileUpload 타입이라고 명시
    ){
        console.log(files)
        console.log("⭕️ 파일 업로드 완료")
        return this.fileService.upload({files})
    }
}