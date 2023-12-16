import { Test, TestingModule } from '@nestjs/testing';
import { databaseProviders } from 'src/database/database.providers';
import { urlProviders } from 'src/modules/url/providers/url.provider';
import { UrlService } from './url.service';

describe('UrlService', () => {
	let service: UrlService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UrlService, ...urlProviders, ...databaseProviders],
		}).compile();

		service = module.get<UrlService>(UrlService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should return a short url', () => {
		expect(service.getShortUrl('https://www.google.com')).toMatch(/^[a-z0-9]{6}$/);
	});
});
