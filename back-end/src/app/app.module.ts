import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppResolver } from 'src/app/app.resolver';
import { AppService } from 'src/app/app.service';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/modules/user/user.module';
import { OAuthModule } from 'src/oauth/oauth.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
			playground: true,
		}),
		OAuthModule,
		DatabaseModule,
		UserModule,
		// UrlModule,
	],
	controllers: [],
	providers: [AppService, AppResolver],
})
export class AppModule {}
