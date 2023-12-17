import { PassportStrategy } from '@nestjs/passport';
import { config } from 'dotenv';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import { Injectable } from '@nestjs/common';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			clientID: process.env.GOOGLE_OAUTH2_CLIENT_ID,
			clientSecret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
			callbackURL: 'http://localhost:8080/auth/google/redirect',
			scope: ['email', 'profile'],
		});
	}

	async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
		const { name, emails, photos } = profile;
		const user = {
			email: emails[0].value,
			firstName: name.givenName,
			lastName: name.familyName,
			picture: photos[0].value,
			accessToken,
		};
		done(null, user);
	}
}
