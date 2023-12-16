import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from 'src/database/database.module';
import { User, UserSchema } from 'src/modules/user/entities/user.entity';
import { UserRepository } from 'src/repositories/user.repository';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

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
	providers: [UserResolver, UserService, UserRepository],
})
export class UserModule {}
