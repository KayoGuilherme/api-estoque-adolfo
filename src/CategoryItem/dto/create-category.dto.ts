import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCategoryDTO {

    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsNumber()
    @IsNotEmpty()
    component_id: number
}