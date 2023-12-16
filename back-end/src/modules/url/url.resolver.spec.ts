import { Test, TestingModule } from '@nestjs/testing';
import { databaseProviders } from 'src/database/database.providers';
import { urlProviders } from 'src/modules/url/providers/url.provider';
import { UrlResolver } from './url.resolver';
import { UrlService } from './url.service';

describe('UrlResolver', () => {
	let resolver: UrlResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UrlResolver, UrlService, ...urlProviders, ...databaseProviders],
		}).compile();

		resolver = module.get<UrlResolver>(UrlResolver);
	});

	it('should be defined', () => {
		expect(resolver).toBeDefined();
	});
});
