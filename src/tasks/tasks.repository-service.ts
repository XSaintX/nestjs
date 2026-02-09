/**
 * Tasks Repository Service
 * handles data persistence and retrieval for Task entities using TypeORM.
 */

import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksRepository {
  private logger = new Logger('TasksRepository', {timestamp:true});


  constructor(
    @InjectRepository(Task)
    public readonly repo: Repository<Task>,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    console.log('UUSER', user);

    const query = this.repo.createQueryBuilder('task');
    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    try{
      const tasks = await query.getMany();
      return tasks;
    }
    catch(error){
      //log
      this.logger.error(`Failed to get tasks for user "${user.username}". Filters: ${JSON.stringify(filterDto)}`, error.stack);
      throw new InternalServerErrorException();
    }

  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.repo.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user
    });

    await this.repo.save(task);
    return task;
  }
}
