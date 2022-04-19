import { Injectable } from '@nestjs/common'
import { Storage } from '@google-cloud/storage'
import { FileUpload } from 'graphql-upload'

// file(객체)에 대한 타입을 IFile로 생성
interface IFile{
    files: FileUpload[]
}

@Injectable()
export class FileService{
    async upload( { files } : IFile ){
        // 스토리지에 파일 저장
        const storage = new Storage({
            keyFilename: "valiant-student-347011-87297901c64d.json",
            projectId: "valiant-student-347011"
        })
        .bucket("dahehehe")
        
        // 일단 먼저 다 받기
        const waitedFiles = await Promise.all(files)

        const results 
        = await Promise.all(

            waitedFiles.map( el => {
                return new Promise((resolve, reject)=> {
                    el.createReadStream()
                    .pipe( storage.file(el.filename).createWriteStream() )
                    .on( "finish" , () => resolve( `dahehehe/${el.filename}` ) )
                    .on( "error" , () => reject() )
                })
            })
        )
        return results
    }
}