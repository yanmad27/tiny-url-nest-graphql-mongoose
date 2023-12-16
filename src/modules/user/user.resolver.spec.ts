import { Test, TestingModule } from '@nestjs/testing';
import { databaseProviders } from 'src/database/database.providers';
import { userProviders } from 'src/modules/user/providers/user.provider';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

describe('UserResolver', () => {
	let resolver: UserResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserResolver, UserService, ...databaseProviders, ...userProviders],
		}).compile();

		resolver = module.get<UserResolver>(UserResolver);
	});

	it('should be defined', () => {
		expect(resolver).toBeDefined();
	});
});
