import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Task } from '../entities/task.entity';

@ApiTags('Tasks')
@Controller('columns/:columnId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new task in a column' })
  @ApiParam({ name: 'columnId', description: 'Column ID', type: Number })
  @ApiCreatedResponse({
    description: 'The task has been successfully created.',
    type: Task,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiNotFoundResponse({ description: 'Column not found' })
  @ApiBody({ type: CreateTaskDto })
  async create(
    @Param('columnId', ParseIntPipe) columnId: number,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return await this.tasksService.create({
      ...createTaskDto,
      columnId,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks in a column' })
  @ApiParam({ name: 'columnId', description: 'Column ID', type: Number })
  @ApiOkResponse({
    description: 'Return all tasks in the column',
    type: [Task],
  })
  @ApiNotFoundResponse({ description: 'Column not found' })
  async findAll(
    @Param('columnId', ParseIntPipe) columnId: number,
  ): Promise<Task[]> {
    return await this.tasksService.findAll(columnId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiParam({ name: 'columnId', description: 'Column ID', type: Number })
  @ApiParam({ name: 'id', description: 'Task ID', type: Number })
  @ApiOkResponse({
    description: 'Return the task',
    type: Task,
  })
  @ApiNotFoundResponse({ description: 'Task not found' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return await this.tasksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiParam({ name: 'columnId', description: 'Column ID', type: Number })
  @ApiParam({ name: 'id', description: 'Task ID', type: Number })
  @ApiOkResponse({
    description: 'The task has been successfully updated',
    type: Task,
  })
  @ApiNotFoundResponse({ description: 'Task not found' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiBody({ type: UpdateTaskDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return await this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a task' })
  @ApiParam({ name: 'columnId', description: 'Column ID', type: Number })
  @ApiParam({ name: 'id', description: 'Task ID', type: Number })
  @ApiResponse({
    status: 204,
    description: 'The task has been successfully deleted',
  })
  @ApiNotFoundResponse({ description: 'Task not found' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.tasksService.remove(id);
  }

  @Post(':id/move')
  @ApiOperation({ summary: 'Move a task to another column' })
  @ApiParam({ name: 'columnId', description: 'Source Column ID', type: Number })
  @ApiParam({ name: 'id', description: 'Task ID', type: Number })
  @ApiQuery({
    name: 'targetColumnId',
    description: 'Target Column ID',
    type: Number,
  })
  @ApiQuery({
    name: 'order',
    description: 'New order position in the target column',
    type: Number,
  })
  @ApiOkResponse({
    description: 'The task has been successfully moved',
    type: Task,
  })
  @ApiNotFoundResponse({ description: 'Task or target column not found' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  async moveTask(
    @Param('id', ParseIntPipe) id: number,
    @Query('targetColumnId', ParseIntPipe) targetColumnId: number,
    @Query('order', ParseIntPipe) order: number,
  ): Promise<Task> {
    return await this.tasksService.moveTask(id, targetColumnId, order);
  }
}
