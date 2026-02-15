import { PartialType } from '@nestjs/mapped-types';
import { CreateNameModifierDto } from './create-name-modifier.dto';

export class UpdateNameModifierDto extends PartialType(CreateNameModifierDto) {}
