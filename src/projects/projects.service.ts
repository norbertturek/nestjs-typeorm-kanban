import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateColumnDto } from './dto/create-column.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectColumn } from './entities/project-column.entity';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  private getDefaultColumns(): CreateColumnDto[] {
    return [
      { name: 'To Do', order: 0 },
      { name: 'In Progress', order: 1 },
      { name: 'Done', order: 2 },
    ];
  }

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = this.projectsRepository.create(createProjectDto);

    const columnsData = createProjectDto.columns?.length
      ? createProjectDto.columns
      : this.getDefaultColumns();

    project.columns = columnsData.map((columnData, index) => {
      const column = new ProjectColumn();
      column.name = columnData.name;
      column.order = columnData.order ?? index;
      return column;
    });

    return await this.projectsRepository.save(project);
  }

  async createForUser(
    createProjectDto: CreateProjectDto,
    userId: string,
  ): Promise<Project> {
    const project = this.projectsRepository.create({
      ...createProjectDto,
      userId,
    });
    const columnsData = createProjectDto.columns?.length
      ? createProjectDto.columns
      : this.getDefaultColumns();
    project.columns = columnsData.map((columnData, index) => {
      const column = new ProjectColumn();
      column.name = columnData.name;
      column.order = columnData.order ?? index;
      return column;
    });
    return await this.projectsRepository.save(project);
  }

  async findAllForUser(userId: string): Promise<Project[]> {
    return await this.projectsRepository.find({
      where: { userId },
      relations: ['columns', 'columns.tasks']
    });
  }

  async findAll(): Promise<Project[]> {
    return await this.projectsRepository.find();
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.projectsRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }
    return project;
  }

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.findOne(id);
    const updated = { ...project, ...updateProjectDto };
    return await this.projectsRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const result = await this.projectsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }
  }
}
