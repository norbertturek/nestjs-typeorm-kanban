import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @ApiProperty({
    description: 'The name of the project',
    example: 'Updated Project Name',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'The description of the project',
    example: 'Updated project description',
    required: false,
  })
  description?: string;
}
