import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks/tasks.controller';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/task.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async(c: ConfigService) => ({
        type: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
        host: c.get('DB_HOST'),
        port: c.get('DB_PORT'),
        username: c.get('DB_USERNAME'),
        password: c.get('DB_PASSWORD'),
        database: c.get('DB_DATABASE'),
      })
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5439,
    //   username: 'postgres',
    //   password: 'postgres',
    //   database: 'task-management',
    //   entities: [Task, User],
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),
    TasksModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
