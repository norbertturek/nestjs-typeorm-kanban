import { ApiProperty } from '@nestjs/swagger';

export class CreateColumnDto {
  @ApiProperty({
    description: 'The name of the column',
    example: 'In Progress',
  })
  name: string;

  @ApiProperty({
    description: 'The order of the column in the project',
    example: 1,
    required: false,
    default: 0,
  })
  order?: number;
}
