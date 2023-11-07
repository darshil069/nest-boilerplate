import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional } from 'class-validator';

export class ListOfUserDto {
  @ApiProperty({
    example: { id: 1 },
    type: 'object',
    format: 'object',
    required: false,
  })
  @IsObject()
  @IsOptional()
  condition: object;
}
