import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Role } from "../../enums/role.enum";
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

   
    @IsEnum(Role)
    @ApiProperty({ enum: ['Admin', 'User'], default: 1})  
    @IsOptional()
    role: Role.Professor;

}