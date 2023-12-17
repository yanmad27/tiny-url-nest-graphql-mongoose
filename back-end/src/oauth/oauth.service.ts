import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class OAuthService {
	constructor(private readonly userService: UserService) {}

	async googleLogin(req) {
		if (!req.user) {
			return 'No user from google';
		}

		const user = await this.userService.findOne(req.user.email);
		if (!user) this.userService.create(req.user);

		return {
			message: 'User information from google',
			user: req.user,
		};
	}
}
