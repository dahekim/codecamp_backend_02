import { InputType, PartialType } from "@nestjs/graphql";
import { CreateTattooInput } from "./createTattoo.input";

@InputType()
export class UpdateTattooInput extends PartialType(CreateTattooInput){ }