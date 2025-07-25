import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
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
} from '@nestjs/swagger';
import { ProjectColumnsService } from './project-columns.service';
import { CreateColumnDto } from '../dto/create-column.dto';
import { UpdateColumnDto } from '../dto/update-column.dto';
import { ProjectColumn } from '../entities/project-column.entity';

@ApiTags('Project Columns')
@Controller('projects/:projectId/columns')
export class ProjectColumnsController {
  constructor(private readonly columnsService: ProjectColumnsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new column in a project' })
  @ApiParam({ name: 'projectId', description: 'Project ID', type: Number })
  @ApiCreatedResponse({
    description: 'The column has been successfully created.',
    type: ProjectColumn,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiNotFoundResponse({ description: 'Project not found' })
  @ApiBody({ type: CreateColumnDto })
  async create(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() createColumnDto: CreateColumnDto,
  ): Promise<ProjectColumn> {
    return await this.columnsService.create(projectId, createColumnDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all columns for a project' })
  @ApiParam({ name: 'projectId', description: 'Project ID', type: Number })
  @ApiOkResponse({
    description: 'Return all columns for the project',
    type: [ProjectColumn],
  })
  @ApiNotFoundResponse({ description: 'Project not found' })
  async findAll(
    @Param('projectId', ParseIntPipe) projectId: number,
  ): Promise<ProjectColumn[]> {
    return await this.columnsService.findAll(projectId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a column by ID' })
  @ApiParam({ name: 'projectId', description: 'Project ID', type: Number })
  @ApiParam({ name: 'id', description: 'Column ID', type: Number })
  @ApiOkResponse({
    description: 'Return the column',
    type: ProjectColumn,
  })
  @ApiNotFoundResponse({ description: 'Column not found' })
  async findOne(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProjectColumn> {
    return await this.columnsService.findOne(projectId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a column' })
  @ApiParam({ name: 'projectId', description: 'Project ID', type: Number })
  @ApiParam({ name: 'id', description: 'Column ID', type: Number })
  @ApiOkResponse({
    description: 'The column has been successfully updated',
    type: ProjectColumn,
  })
  @ApiNotFoundResponse({ description: 'Column not found' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiBody({ type: UpdateColumnDto })
  async update(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateColumnDto: UpdateColumnDto,
  ): Promise<ProjectColumn> {
    return await this.columnsService.update(projectId, id, updateColumnDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a column' })
  @ApiParam({ name: 'projectId', description: 'Project ID', type: Number })
  @ApiParam({ name: 'id', description: 'Column ID', type: Number })
  @ApiResponse({
    status: 204,
    description: 'The column has been successfully deleted',
  })
  @ApiNotFoundResponse({ description: 'Column not found' })
  async remove(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return await this.columnsService.remove(projectId, id);
  }
}
