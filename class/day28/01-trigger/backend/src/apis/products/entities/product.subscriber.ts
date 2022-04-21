import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm'
import { BigQuery } from '@google-cloud/bigquery'

import { Product } from './product.entity'
import { env } from 'process'

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<Product> {
    constructor(connection: Connection){
        // ProductSubscriber를 넣어서 db와 연결해준다
        connection.subscribers.push(this)
    }
    // Product 테이블을 리슨
    listenTo(){
        return Product
    }
    afterInsert( event: InsertEvent<Product> ){
        // 이벤트에 엔티티가 있다~ 
        console.log("⛔️⛔️⛔️⛔️이벤트입니다⛔️⛔️⛔️⛔️")
        console.log(event)
        console.log("⛔️⛔️⛔️⛔️이벤트입니다⛔️⛔️⛔️⛔️")

        const bigQuery = new BigQuery({
            keyFilename:process.env.GCO_BIGQUERY_KEY_FILENAME,
            projectId:"my-project-cocdcamp",
        })
        bigQuery.dataset("mybigQuery02").table("productlog").insert([
            {
                id : event.entity.id,
                name : event.entity.name,
                description : event.entity.description,
                price : event.entity.price,
                isSoldout : event.entity.isSoldout,
            },
        ])
    }

}