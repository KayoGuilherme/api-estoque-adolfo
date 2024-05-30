import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ComponentsCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nome_component: string;
}
