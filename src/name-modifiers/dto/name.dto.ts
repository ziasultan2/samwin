import { ApiProperty } from '@nestjs/swagger';

export class NameDTO {
  @ApiProperty({
    description: 'Name to generate variations for',
    example: 'KOESTNER',
  })
  name: string;
}
