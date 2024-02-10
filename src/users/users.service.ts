import { Task } from './../tasks/task.entity'
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
	  ) {}

	  async getUsers(): Promise<User[]> {

		const res = await this.usersRepository.find()

		return res

	  }

	  async getUser(id: string): Promise<User> {
		return await this.usersRepository.findOneBy({ id })
	  }

	  async getManyUsers(usersIds: string[]): Promise<User[]> {

		return await this.usersRepository.createQueryBuilder("user")
		.where("user.id IN (:...usersIds)", { usersIds })
		.getMany()

	  }

	  async getUserByTask(task: Task): Promise<User> {

		return await this.usersRepository.findOne({
			where: {
			  tasks: [task],
			},
		})

	  }

}
