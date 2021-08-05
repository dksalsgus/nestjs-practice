import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'nesttask',
      autoLoadEntities: true,
      synchronize: true,
      // authentication: {
      //   type: 'default',
      //   options: {
      //     userName: 'root',
      //     password: '1234',
      //   },
      // },
    }),
    AuthModule,
  ],
})
export class AppModule {}
