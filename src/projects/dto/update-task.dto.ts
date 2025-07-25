import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({
    description: 'The new title of the task',
    example: 'Update authentication flow',
    required: false,
  })
  title?: string;

  @ApiProperty({
    description: 'The new description of the task',
    example: 'Update to use refresh tokens',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'The new order of the task in the column',
    example: 2,
    required: false,
  })
  order?: number;

  @ApiProperty({
    description: 'The ID of the column to move this task to',
    example: 3,
    required: false,
  })
  columnId?: number;
}
