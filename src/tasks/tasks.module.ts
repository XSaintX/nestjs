import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository-service';
import { Task } from './task.entity';

@Module({
  imports: [
    // repository to be used within the module
    TypeOrmModule.forFeature([Task]),
  ],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository],
  exports: [],
})
export class TasksModule {}
