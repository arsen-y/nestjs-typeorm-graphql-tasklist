import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserType } from './user.type';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/get-user.decorator';
import { User } from './user.entity';
import { GqlAuthGuard } from 'src/auth/graphqlJwtAuthGuard';

@Resolver(of => UserType)
export class UsersResolver {
	constructor(private usersService: UsersService) {}

	@Query((returns) => [UserType])
	@UseGuards(GqlAuthGuard)
	getUsers(
	  @CurrentUser() user: User,
	) {
	  return this.usersService.getUsers();
	}

}