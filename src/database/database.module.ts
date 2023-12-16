import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// @Module({
// 	providers: [...databaseProviders],
// 	exports: [...databaseProviders],
// })
@Module({
	imports: [
		MongooseModule.forRoot(process.env.MONGODB_URI, {
			authSource: 'admin',
			user: process.env.MONGODB_USERNAME,
			pass: process.env.MONGODB_PASSWORD,
			dbName: process.env.MONGODB_DATABASE,
		}),
	],
})
export class DatabaseModule {}
