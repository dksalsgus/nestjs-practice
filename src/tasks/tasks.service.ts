import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private tasksRepository: TaskRepository,
  ) {}
  public getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  public async getTaskById(id: string): Promise<Task> {
    const found = this.tasksRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with ID"${id}" not found`);
    }
    return found;
  }

  public createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  public async deleteTask(id: string): Promise<void> {
    const ret = await this.tasksRepository.delete(id);
    console.log(ret);
    if (ret.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  public async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = status;

    return await this.tasksRepository.save(task);
  }
}
