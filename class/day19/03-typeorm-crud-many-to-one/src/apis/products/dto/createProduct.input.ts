import { Field, InputType, Int } from "@nestjs/graphql"
import { ProductSaleslocationInput } from "src/apis/productsSaleslocation/dto/productSaleslocation.input"
// import { ProductSaleslocation } from 'src/apis/productsSaleslocation/entities/productSaleslocation.entity'

@InputType()
export class CreateProductInput{
    @Field(() => String)
    name: string

    @Field(() => String)
    description: string

    @Field(() => Int)
    price: number

    @Field( ()=> ProductSaleslocationInput )
    productSaleslocation: ProductSaleslocationInput
    // ProductSaleslocation 그대로 가져오면 된다!
    // 근데 그대로 가져오면 안 되어서 ProductSaleslocationInput 만들어서 가져와야 한다!

    @Field(() => String)
    productCategoryId: string
}