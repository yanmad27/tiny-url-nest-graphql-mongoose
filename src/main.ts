import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	await app.listen(8080);
	console.log('LOG ~ bootstrap ~ 8080:', 8080);
}
bootstrap();