import { ApiProperty } from '@nestjs/swagger';
import { CreateColumnDto } from './create-column.dto';

export class CreateProjectDto {
  @ApiProperty({
    description: 'The name of the project',
    example: 'My Awesome Project',
  })
  name: string;

  @ApiProperty({
    description: 'The description of the project',
    required: false,
    example: 'This is a sample project',
  })
  description?: string;

  @ApiProperty({
    description: 'The email of the user creating the project',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Optional array of columns to create with the project',
    type: [CreateColumnDto],
    required: false,
  })
  columns?: CreateColumnDto[];
}