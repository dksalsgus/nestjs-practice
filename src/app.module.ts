import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      // config파일 경로 STAGE는 환경변수 prod or dev
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
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
