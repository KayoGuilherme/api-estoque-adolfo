import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LabsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nome_lab: string;
}
