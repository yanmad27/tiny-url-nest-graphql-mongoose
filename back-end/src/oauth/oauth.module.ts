import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from 'src/database/database.module';
import { User, UserSchema } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { GoogleStrategy } from 'src/oauth/google.strategy';
import { OAuthController } from 'src/oauth/oauth.controller';
import { OAuthService } from 'src/oauth/oauth.service';
import { UserRepository } from 'src/repositories/user.repository';

@Module({
	imports: [
		DatabaseModule,
		MongooseModule.forFeature([
			{
				name: User.name,
				schema: UserSchema,
			},
		]),
	],
	controllers: [OAuthController],
	providers: [OAuthService, GoogleStrategy, UserService, UserRepository],
})
export class OAuthModule {}
