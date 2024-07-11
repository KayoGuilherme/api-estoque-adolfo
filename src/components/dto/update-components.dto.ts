import { PartialType } from '@nestjs/swagger';
import { CreateComponentDTO } from './create-components.dto';

export class UpdateComponentDto extends PartialType(CreateComponentDTO) {}
