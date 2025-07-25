import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { ProjectColumn } from '../entities/project-column.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(ProjectColumn)
    private columnsRepository: Repository<ProjectColumn>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const column = await this.columnsRepository.findOne({
      where: { id: createTaskDto.columnId },
    });

    if (!column) {
      throw new NotFoundException(
        `Column with ID "${createTaskDto.columnId}" not found`,
      );
    }

    const task = this.tasksRepository.create({
      ...createTaskDto,
      column,
    });

    return await this.tasksRepository.save(task);
  }

  async findAll(columnId: number): Promise<Task[]> {
    return await this.tasksRepository.find({
      where: { column: { id: columnId } },
      order: { order: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    let column = task.column;

    if (updateTaskDto.columnId && updateTaskDto.columnId !== column.id) {
      const newColumn = await this.columnsRepository.findOne({
        where: { id: updateTaskDto.columnId },
      });
      
      if (!newColumn) {
        throw new NotFoundException(
          `Column with ID "${updateTaskDto.columnId}" not found`,
        );
      }
      column = newColumn;
    }

    const updated = this.tasksRepository.merge(task, {
      ...updateTaskDto,
      column,
    });

    return await this.tasksRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async moveTask(taskId: number, targetColumnId: number, newOrder: number): Promise<Task> {
    const task = await this.findOne(taskId);
    const targetColumn = await this.columnsRepository.findOne({
      where: { id: targetColumnId },
    });

    if (!targetColumn) {
      throw new NotFoundException(
        `Target column with ID "${targetColumnId}" not found`,
      );
    }

    // Update task's column and order
    task.column = targetColumn;
    task.order = newOrder;

    return await this.tasksRepository.save(task);
  }
}
