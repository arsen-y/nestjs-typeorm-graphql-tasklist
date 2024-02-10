import { IsEnum, IsUUID } from 'class-validator';
import { TaskStatus } from './task-status.enum';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UPdateTaskStatusInput {

	@IsUUID()
	@Field()
	id: string

	@IsEnum(TaskStatus)
	@Field()
	status: TaskStatus
	
}