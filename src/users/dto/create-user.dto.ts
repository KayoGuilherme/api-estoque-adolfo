import { IsEmail,  IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";


export class CreateUserDTO {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true})
    nome: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ required: true})
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @ApiProperty({ required: true})
    senha: string


    @ApiProperty({ enum: ['Admin', 'User'], default: 1})  
    @IsOptional()
    role: number

}