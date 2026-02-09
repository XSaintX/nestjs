/**
 * Tasks Service
 * Handles business logic for Task entities and interacts with the TasksRepositories.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { TasksRepository } from './tasks.repository-service';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    console.log('checking 2');
    console.log(id);
    console.log('user');
    console.log(user);
    // const found = await this.tasksRepository.repo.findOne({
    //   where: { id: id },
    // });
    const found2 = await this.tasksRepository.repo.findOne({
      where: { id: id },
    });
    console.log('found2');
    console.log(found2);
    const found = await this.tasksRepository.repo.findOne({
      where: { id: id, user: user },
    });
    console.log('found');
    console.log(found);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.tasksRepository.repo.delete({ id: id, user: user });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);

    task.status = status;
    await this.tasksRepository.repo.save(task);

    return task;
  }
}
