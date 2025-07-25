import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectColumn } from '../entities/project-column.entity';
import { CreateColumnDto } from '../dto/create-column.dto';
import { UpdateColumnDto } from '../dto/update-column.dto';

@Injectable()
export class ProjectColumnsService {
  constructor(
    @InjectRepository(ProjectColumn)
    private columnsRepository: Repository<ProjectColumn>,
  ) {}

  async create(
    projectId: number,
    createColumnDto: CreateColumnDto,
  ): Promise<ProjectColumn> {
    const column = this.columnsRepository.create({
      ...createColumnDto,
      project: { id: projectId },
    });
    return await this.columnsRepository.save(column);
  }

  async findAll(projectId: number): Promise<ProjectColumn[]> {
    return await this.columnsRepository.find({
      where: { project: { id: projectId } },
      order: { order: 'ASC' },
    });
  }

  async findOne(projectId: number, id: number): Promise<ProjectColumn> {
    const column = await this.columnsRepository.findOne({
      where: { id, project: { id: projectId } },
    });

    if (!column) {
      throw new NotFoundException(
        `Column with ID "${id}" not found in project "${projectId}"`,
      );
    }

    return column;
  }

  async update(
    projectId: number,
    id: number,
    updateColumnDto: UpdateColumnDto,
  ): Promise<ProjectColumn> {
    const column = await this.findOne(projectId, id);
    const updated = this.columnsRepository.merge(
      column,
      updateColumnDto as Partial<ProjectColumn>,
    );
    return await this.columnsRepository.save(updated);
  }

  async remove(projectId: number, id: number): Promise<void> {
    const result = await this.columnsRepository.delete({
      id,
      project: { id: projectId },
    });

    if (result.affected === 0) {
      throw new NotFoundException(
        `Column with ID "${id}" not found in project "${projectId}"`,
      );
    }
  }
}
