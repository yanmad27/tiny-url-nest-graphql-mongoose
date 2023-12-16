import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { urlProviders } from 'src/modules/url/providers/url.provider';
import { UrlResolver } from './url.resolver';
import { UrlService } from './url.service';

@Module({
	imports: [DatabaseModule],
	providers: [UrlResolver, UrlService, ...urlProviders],
})
export class UrlModule {}
