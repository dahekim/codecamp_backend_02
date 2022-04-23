import { Injectable } from "@nestjs/common"
import { Storage } from '@google-cloud/storage'
import { FileUpload } from 'graphql-upload'
import { v4 as uuidv4 } from 'uuid'
import { getToday } from "src/commons/libraries/utils"

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
            waitedFiles.map( ele => {
                return new Promise( (resolve, reject) => {
                    const fname = `${getToday()}/${uuidv4()}/origin/${ele.filename}`
                    ele.createReadStream().pipe(storage.file(fname).createWriteStream ())
                    .on( "finish" , () => resolve (`${myBucket}/${fname}`) )
                    .on( "error" , () =>reject() )
                })
            })
        )
        console.log(results)
        console.log("⭕️ 파일 넘길게")
        return results
        
    }
}