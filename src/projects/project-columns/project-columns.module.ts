import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectColumn } from '../entities/project-column.entity';
import { ProjectColumnsService } from './project-columns.service';
import { ProjectColumnsController } from './project-columns.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectColumn])],
  providers: [ProjectColumnsService],
  controllers: [ProjectColumnsController],
  exports: [ProjectColumnsService],
})
export class ProjectColumnsModule {}
