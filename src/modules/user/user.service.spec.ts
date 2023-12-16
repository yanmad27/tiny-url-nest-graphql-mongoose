import { Test, TestingModule } from '@nestjs/testing';
import { databaseProviders } from 'src/database/database.providers';
import { userProviders } from 'src/modules/user/providers/user.provider';
import { UserService } from './user.service';

describe('UserService', () => {
	let service: UserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserService, ...userProviders, ...databaseProviders],
		}).compile();

		service = module.get<UserService>(UserService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
