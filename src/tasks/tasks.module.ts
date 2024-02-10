import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { AuthModule } from '../auth/auth.module';
import { TaskResolver } from './tasks.resolver';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]), 
    AuthModule, 
    UsersModule
  ], 
  controllers: [TasksController],
  providers: [TasksService, TaskResolver]
})
export class TasksModule {}
