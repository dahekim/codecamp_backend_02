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
        const bucketName = process.env.GCP_MY_BUCKET
        // 스토리지에 파일 저장
        const storage = new Storage({
            keyFilename: process.env.GCP_KEY_FILENAME,
            projectId: process.env.GCP_PROJECT_ID,
        })
        .bucket(process.env.GCP_MY_BUCKET)
        
        // 일단 먼저 다 받기
        const waitedFiles = await Promise.all(files)

        const results 
        = await Promise.all(

            waitedFiles.map( el => {
                return new Promise((resolve, reject)=> {
                    el.createReadStream()
                    .pipe( storage.file(el.filename).createWriteStream() )
                    .on( "finish" , () => resolve( `${bucketName}/${el.filename}` ) )
                    .on( "error" , () => reject() )
                })
            })
        )
        return results
    }
}