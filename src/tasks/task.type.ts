import { Field, ID, ObjectType } from '@nestjs/graphql';
import { TaskStatus } from './task-status.enum';

@ObjectType('Task')
export class TaskType {

  @Field(type => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  status: TaskStatus;

}
