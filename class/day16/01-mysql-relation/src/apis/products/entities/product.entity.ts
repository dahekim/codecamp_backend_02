import { ProductCategory } from 'src/apis/productsCategory/entities/productCategory.entity'
import { ProductSaleslocation } from 'src/apis/productsSaleslocation/entities/productSaleslocation.entity'
import { ProductTag } from 'src/apis/productTag/entities/productTag.entity'
import { User } from 'src/apis/users/entities/user.entity'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string
    
    @Column()
    name: string
    
    @Column()
    description: string
    
    @Column()
    price: number

    @Column()
    isSoldout: boolean
    // soldAt: Date // 안팔리면 빈칸, 팔리면 데이터도 있고 날짜도 찍히구

    
    // 2. 1:1 mapping column 라고 알려준다 
    // 3. ProductSaleslocation랑 1:1 관계 (OneToOne) 이라고 알려준다
    @OneToOne( ()=> ProductSaleslocation )
    // 4. 컬럼을 가지고 연결하겠다는 명시
    // OneToOne 기준이 있는 곳에 join 컬럼을 둔다, 반대로 바뀔 수 있기 때문에? 
    @JoinColumn()
    
    // 1. 거래 위치가 있는 ID만 들어가기 때문에 참조한 테이블에 있는 id 만 들어갈 수 있다고 명시
    productSaleslocation: ProductSaleslocation


    // product가 many, productCategory가 one
    // 상품은 많이 있을 수 있고 그게 하나의 카테고리 안에 포함된다
    @ManyToOne( () => ProductCategory)
    productCategory: ProductCategory

    @ManyToOne(() => User)
    user : User

    // 둘 중에 하나만 해주면 댄다
    @JoinTable()
    @ManyToMany(() => ProductTag, (productTags) => productTags.products)
    productTags: ProductTag[]
}
