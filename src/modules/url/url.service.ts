import { Inject, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { Model } from 'mongoose';
import { Url } from 'src/modules/url/entities/url.entity';
import { CreateUrlInput } from './dto/create-url.input';

@Injectable()
export class UrlService {
	constructor(
		@Inject('URL_MODEL')
		private readonly urlModel: Model<Url>,
	) {}

	getShortUrl(longUrl: string): string {
		const sha256Hash = crypto
			.createHash('sha256')
			.update(new Date().getTime().toString() + longUrl)
			.digest('hex');

		const shortHash = sha256Hash.slice(0, 6);
		return shortHash;
	}

	create(createUrlInput: CreateUrlInput) {
		const createdUrl = new this.urlModel(createUrlInput);
		createdUrl.shortUrl = this.getShortUrl(createdUrl.fullUrl);
		createdUrl.expireAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

		return createdUrl.save();
	}

	findAll() {
		return `This action returns all url`;
	}

	findOne(id: number) {
		return `This action returns a #${id} url`;
	}

	remove(id: number) {
		return `This action removes a #${id} url`;
	}
}
