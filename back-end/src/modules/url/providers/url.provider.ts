import { Mongoose } from 'mongoose';
import { UrlSchema } from 'src/modules/url/entities/url.entity';

export const urlProviders = [
	{
		provide: 'URL_MODEL',
		useFactory: (mongoose: Mongoose) => mongoose.model('url', UrlSchema),
		inject: ['DATABASE_CONNECTION'],
	},
];
