import { Injectable } from "@nestjs/common";
import { Storage } from '@google-cloud/storage'
import { FileUpload } from 'graphql-upload'

// files에 대한 타입을 IFile로 생성
interface IFile{
    files: FileUpload[]
}

@Injectable()
export class FileService{
    async upload( {files} : IFile ){
        const myBucket = process.env.GCP_BUCKET_LOCATION
        const storage = new Storage({
            keyFilename: process.env.GCP_KEY_FILENAME,
            projectId: process.env.GCP_PROJECT_ID,
        }).bucket(myBucket)

        const waitedFiles = await Promise.all(files)

        const results 
        = await Promise.all(
            waitedFiles.map( el => {
                return new Promise( (resolve, reject) => {
                    el.createReadStream().pipe(storage.file(el.filename).createWriteStream ())
                    .on( "finish" , () => resolve (`${myBucket}/${el.filename}`) )
                    .on( "error" , () =>reject() )
                })
            })
        )
        console.log(results)
        console.log("⭕️ 파일 업로드 완료")
        return results
        
    }
}