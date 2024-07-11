import { PartialType } from '@nestjs/swagger';
import { LabsDto } from './create-components-category.dto';

export class UpdateLabsDto extends PartialType(LabsDto) {}
