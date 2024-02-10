import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Task } from 'src/tasks/task.entity';
import { TaskType } from 'src/tasks/task.type';

@ObjectType('User')
export class UserType {

  @Field(type => ID)
  id: string;

  @Field()
  username: string;

  @Field(type => [TaskType])
  tasks: TaskType[];

}
