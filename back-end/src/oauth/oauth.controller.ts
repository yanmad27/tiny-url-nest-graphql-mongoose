import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OAuthService } from 'src/oauth/oauth.service';

@Controller('auth/google')
export class OAuthController {
	constructor(private readonly oAuthService: OAuthService) {}

	@Get()
	@UseGuards(AuthGuard('google'))
	async googleAuth(@Req() req) {
		return '';
	}

	@Get('redirect')
	@UseGuards(AuthGuard('google'))
	googleAuthRedirect(@Req() req) {
		return this.oAuthService.googleLogin(req);
	}
}
