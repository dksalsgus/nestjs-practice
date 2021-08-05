import { EntityRepository, Repository } from 'typeorm';
import { Task } from '../task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  //
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    // 생성
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    // 저장
    const saveTask = await this.save(task);
    return saveTask;
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { search, status } = filterDto;
    const query = this.createQueryBuilder('task');
    if (status) {
      query.andWhere('tasks.status=:status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE:search OR LOWER(task.description) LIKE:search',
        {
          search: `%${search}%`,
        },
      );
    }

    // CLEAN -> clean
    const tasks = await query.getMany();
    return tasks;
  }
}
