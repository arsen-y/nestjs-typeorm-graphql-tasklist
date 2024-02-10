import { TasksService } from './tasks.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../users/user.entity';
import { ConfigService } from '@nestjs/config';
import { CreateTaskInput } from './create-task.input';
import { GetTasksFilterInput } from './get-tasks-filter.input';
import { UPdateTaskStatusInput } from './update-task-status.input';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {

  private logger = new Logger('TasksController')

  constructor(private tasksService: TasksService, private configService: ConfigService) {
    //console.log(this.configService.get<string>('TEST_VALUE', 'def'))
  }

  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterInput, 
    @GetUser() user: User
  ): Promise<Task[]> {
    this.logger.verbose(`User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(filterDto)}`)
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.tasksService.deleteTaskById(id, user);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskInput, 
    @GetUser() user: User
  ): Promise<Task> {
    this.logger.verbose(`User "${user.username}" creating a task. createTaskDto: ${JSON.stringify(createTaskDto)}`)
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UPdateTaskStatusInput,
    @GetUser() user: User
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status, user);
  }

}
