import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'The title of the task',
    example: 'Implement user authentication',
  })
  title: string;

  @ApiProperty({
    description: 'The description of the task',
    example: 'Implement JWT authentication for the API',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'The order of the task in the column',
    example: 1,
    required: false,
    default: 0,
  })
  order?: number;

  @ApiProperty({
    description: 'The ID of the column this task belongs to',
    example: 1,
  })
  columnId: number;
}
