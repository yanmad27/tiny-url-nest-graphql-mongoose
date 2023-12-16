import { Test, TestingModule } from '@nestjs/testing';
import { AppResolver } from 'src/app/app.resolver';
import { AppService } from './app.service';

describe('AppController', () => {
	let appResolver: AppResolver;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			providers: [AppResolver, AppService],
		}).compile();

		appResolver = app.get<AppResolver>(AppResolver);
	});

	describe('root', () => {
		it('should return "Hello World!"', () => {
			expect(appResolver.getHello()).toBe('Hello World!');
		});
	});
});
