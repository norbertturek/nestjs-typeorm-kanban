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
  Req,
  UseGuards,
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
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { Request } from 'express';
import { UsersService } from '../users/users.service';
import { ClerkGuard } from '../auth/clerk.guard';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @UseGuards(ClerkGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new project' })
  @ApiCreatedResponse({
    description: 'The project has been successfully created.',
    type: Project,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiBody({ type: CreateProjectDto })
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @Req() req: Request,
  ): Promise<Project> {
    // Get sub (userId) from JWT and email from request body
    const { sub } = (req as any).auth;
    const { email } = createProjectDto;
    
    if (!sub || !email) {
      throw new Error('Brak danych użytkownika (sub lub email)');
    }
    
    const user = await this.usersService.findOrCreate({ id: sub, email });
    return await this.projectsService.createForUser(createProjectDto, user.id);
  }

  @Get()
  @UseGuards(ClerkGuard)
  @ApiOperation({ summary: 'Get all projects for the authenticated user' })
  @ApiOkResponse({
    description: 'Return all projects for the authenticated user',
    type: [Project],
  })
  async findAll(@Req() req: Request): Promise<Project[]> {
    const { sub } = (req as any).auth;
    return await this.projectsService.findAllForUser(sub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a project by ID' })
  @ApiParam({ name: 'id', description: 'Project ID', type: Number })
  @ApiOkResponse({
    description: 'Return the project',
    type: Project,
  })
  @ApiNotFoundResponse({ description: 'Project not found' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Project> {
    return await this.projectsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a project' })
  @ApiParam({ name: 'id', description: 'Project ID', type: Number })
  @ApiOkResponse({
    description: 'The project has been successfully updated',
    type: Project,
  })
  @ApiNotFoundResponse({ description: 'Project not found' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiBody({ type: UpdateProjectDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return await this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a project' })
  @ApiParam({ name: 'id', description: 'Project ID', type: Number })
  @ApiResponse({
    status: 204,
    description: 'The project has been successfully deleted',
  })
  @ApiNotFoundResponse({ description: 'Project not found' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.projectsService.remove(id);
  }
}
