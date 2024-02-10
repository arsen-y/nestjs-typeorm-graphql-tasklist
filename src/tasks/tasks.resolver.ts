import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { TaskType } from './task.type';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/user.entity';
import { GqlAuthGuard } from 'src/auth/graphqlJwtAuthGuard';
import { TasksService } from './tasks.service';
import { CreateTaskInput } from './create-task.input';
import { GetTasksFilterInput } from './get-tasks-filter.input';
import { UPdateTaskStatusInput } from './update-task-status.input';
import { UsersService } from 'src/users/users.service';
import { Task } from './task.entity';
import { UserType } from 'src/users/user.type';

@Resolver((of) => TaskType)
export class TaskResolver {
  constructor(
	private tasksService: TasksService, 
	private usersService: UsersService
	) {}

  @Query((returns) => [TaskType])
  @UseGuards(GqlAuthGuard)
  getTasks(
    @CurrentUser() user: User,
    @Args('filterInput') filterInput: GetTasksFilterInput,
  ) {
    return this.tasksService.getTasks(filterInput, user);
  }

  @Query((returns) => TaskType)
  @UseGuards(GqlAuthGuard)
  getTaskById(@CurrentUser() user: User, @Args('id') id: string) {

    return this.tasksService.getTaskById(id, user);
  }

  @Mutation((returns) => [TaskType])
  @UseGuards(GqlAuthGuard)
  deleteTaskById(@CurrentUser() user: User, @Args('id') id: string) {
    this.tasksService.deleteTaskById(id, user);

    return [];
  }

  @Mutation((returns) => TaskType)
  @UseGuards(GqlAuthGuard)
  createTask(
    @CurrentUser() user: User,
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
  ) {
    return this.tasksService.createTask(createTaskInput, user);
  }

  @Mutation((returns) => TaskType)
  @UseGuards(GqlAuthGuard)
  updateTaskStatus(
    @CurrentUser() user: User,
	@Args('updateTaskStatusInput') updateTaskStatusInput: UPdateTaskStatusInput, 
  ) {

	const { id, status } = updateTaskStatusInput
    return this.tasksService.updateTaskStatus(id, status, user);
  }

  @ResolveField('user', returns => UserType)
  async user(@Parent() task: Task) {
	return await this.usersService.getUserByTask(task)
  }

}
