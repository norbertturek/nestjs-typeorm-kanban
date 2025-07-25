import { ApiProperty } from '@nestjs/swagger';

export class UpdateColumnDto {
  @ApiProperty({
    description: 'The new name of the column',
    example: 'In Progress',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'The new order of the column in the project',
    example: 2,
    required: false,
  })
  order?: number;
}
