import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'

@InputType()
export class CreateTaskInput {
    @IsNotEmpty()
	@Field()
    title: string
    
    @IsNotEmpty()
	@Field()
    description: string
}