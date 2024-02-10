import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from './task-status.enum';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetTasksFilterInput {

  @IsOptional()
  @IsEnum(TaskStatus)
  @Field({ nullable: true })
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  search?: string;

}
