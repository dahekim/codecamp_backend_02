import { Field, InputType, Int } from "@nestjs/graphql"
import { ProductSaleslocationInput } from "src/apis/productsSaleslocation/dto/productSaleslocation.input"


@InputType()
export class CreateProductInput{
    // ...product
    @Field(() => String)
    name: string

    @Field(() => String)
    description: string

    @Field(() => Int)
    price: number

    // 1
    @Field( ()=> ProductSaleslocationInput )
    productSaleslocation: ProductSaleslocationInput
    // 2
    @Field(() => String)
    productCategoryId: string
    // 3
    @Field(() => [String])  // graphQL type, 배열로 감싼 string
    productTags: string[]   // TypeORM type, 배열로 감싼 string
}