import { InputType, OmitType } from "@nestjs/graphql";
import { Design } from "../entities/design.entity";

@InputType()
export class DesignInput extends OmitType(Design, ['id_design'], InputType){}