import { Field, Int, ObjectType } from '@nestjs/graphql'
import { ProductCategory } from 'src/apis/productsCategory/entities/productCategory.entity'
import { ProductSaleslocation } from 'src/apis/productsSaleslocation/entities/productSaleslocation.entity'
import { ProductTag } from 'src/apis/productTag/entities/productTag.entity'
import { User } from 'src/apis/users/entities/user.entity'
import { 
    Column, 
    DeleteDateColumn, 
    UpdateDateColumn,
    Entity, 
    JoinColumn, 
    JoinTable, 
    ManyToMany,
    ManyToOne, 
    OneToOne, 
    PrimaryGeneratedColumn } from 'typeorm'


@Entity()
@ObjectType()
export class Product {
    // 직접 넣을 필요 X, 자동 생성된다
    @PrimaryGeneratedColumn("uuid")
    @Field(()=> String)
    id: string
    
    @Column()
    @Field(()=> String)
    name: string
    
    @Column()
    @Field(()=> String)
    description: string
    
    @Column()
    @Field(()=> Int)
    price: number

    // 기본값을 false로 지정해본다
    // MySQL에 들어가는 디폴트 값 설정 ( @Column( {default : false} ) )
    @Column( {default : false} )
    @Field(()=> Boolean)
    isSoldout: boolean
    // soldAt: Date // 안팔리면 빈칸, 팔리면 데이터도 있고 날짜도 찍히구, 이게 더 좋은 방법이야...

    // 1. 거래 위치가 있는 ID만 들어가기 때문에 참조한 테이블에 있는 id 만 들어갈 수 있다고 명시
    // 2. 1:1 mapping column 라고 알려준다 
    // 3. ProductSaleslocation랑 1:1 관계 (OneToOne) 이라고 알려준다
    // 4. 컬럼을 가지고 연결하겠다는 명시
    // OneToOne 기준이 있는 곳에 join 컬럼을 둔다, 반대로 바뀔 수 있기 때문에? 

    // soft delete를 위해 deletedAt 생성
    // 쓸 거면 이게 더 나음 (삭제하면 삭제한 날짜도 볼 수 있으니깐...)
    // 필드는 없다
    // @DeleteDateColumn()
    // @Column( {default : null} )
    // deletedAt: Date

    // // soft delete를 위해 isDeleted 생성
    // @Column( {default : false} )
    // @Field(()=> Boolean)
    // isDeleted: boolean

    // soft delete를 위해 TypeORM 에서 자체제공하는 softRemove 사용    
    @DeleteDateColumn()
    deletedAt: Date

    @UpdateDateColumn()
    updatedAt: Date



    @JoinColumn()
    @OneToOne( ()=> ProductSaleslocation )
    @Field(()=> ProductSaleslocation)    
    productSaleslocation: ProductSaleslocation


    // product가 many, productCategory가 one
    // 상품은 많이 있을 수 있고 그게 하나의 카테고리 안에 포함된다
    @ManyToOne( () => ProductCategory)
    @Field(()=> ProductCategory)
    productCategory: ProductCategory

    @ManyToOne(() => User)
    @Field(()=> User)
    user : User

    // 둘 중에 하나만 해주면 댄다
    @JoinTable()
    @ManyToMany(() => ProductTag, (productTags) => productTags.products)
    @Field( ()=> [ProductTag] )
    productTags: ProductTag[]
}
