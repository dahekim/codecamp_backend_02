import { InputType, OmitType } from "@nestjs/graphql";
import { Method } from "../entities/method.entity";

@InputType()
export class MethodInput extends OmitType(Method, ['id_method'], InputType){}