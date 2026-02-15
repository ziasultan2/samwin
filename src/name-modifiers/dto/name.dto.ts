import { ApiProperty } from '@nestjs/swagger';
import { MinLength, IsString } from 'class-validator';

export class NameDTO {
  @ApiProperty({
    description: 'Name to generate variations for',
    example: 'KOESTNER',
    minLength: 3,
  })
  @IsString()
  @MinLength(3, {
    message: 'Name must be at least 3 characters long',
  })
  name: string;
}
