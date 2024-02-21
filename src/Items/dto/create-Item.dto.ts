import { ApiProperty } from "@nestjs/swagger";
import {  IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class CreateItemDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    nome: string;


    @IsNumber()
    @ApiProperty()
    estoque: number;

    
    @IsNumber()
    @ApiProperty()
    categoryId: number;

}