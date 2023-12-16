import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUrlInput {
	@Field(() => String)
	fullUrl: string;
}
