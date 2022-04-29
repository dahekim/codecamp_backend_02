import { InputType, PartialType } from "@nestjs/graphql"
import { CreateProductInput } from "./createProduct.input"

@InputType()
export class UpdateProductInput extends PartialType (CreateProductInput) {}
// CreateProductInput을 상속받을게!
// () 안에 있는 개체들이 있어도 되고 없어도 되는 부분들로 변경된다! (graphql에서 제공하는 PartialType)
// 전체를 복사하지 않아도 쉽게 가져올 수 있어~ 