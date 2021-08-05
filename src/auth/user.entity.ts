import { Task } from 'src/tasks/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  // eager : true => User 조회할때마다 Task 자동으로 같이 select
  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
