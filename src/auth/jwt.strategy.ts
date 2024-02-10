import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { JwtPayload } from './jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
import { configValidationValue } from '../config.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

	constructor(
		@InjectRepository(User)
    	private readonly usersRepository: Repository<User>,
		private configService: ConfigService<Record<configValidationValue, unknown>, false>
	) {
		super({
			secretOrKey: configService.get('JWT_SECRET'), 
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
		})
	}

	async validate(payload: JwtPayload): Promise<User> {

		const { username } = payload

		const user: User = await this.usersRepository.findOneBy({ username })

		if(!user) {
			throw new UnauthorizedException()
		}

		return user
		
	}
}

