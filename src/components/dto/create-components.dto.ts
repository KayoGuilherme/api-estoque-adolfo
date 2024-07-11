import { IsNotEmpty,  IsString } from 'class-validator';

export class CreateComponentDTO {
  @IsNotEmpty()
  @IsString()
  nome_componente: string;
}
