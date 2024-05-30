import { PartialType } from '@nestjs/swagger';
import { ComponentsCategoryDto } from './create-components-category.dto';

export class UpdateComponentsCategoryDto extends PartialType(ComponentsCategoryDto) {}
