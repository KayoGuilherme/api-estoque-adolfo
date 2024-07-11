import { ApiProperty } from "@nestjs/swagger";
import {  IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  nome_item: string;

  @IsNumber()
  @ApiProperty()
  estoque: number;

  @IsNumber()
  @ApiProperty()
  component_id: number;

  @IsNumber()
  @ApiProperty()
  lab_id: number;
}