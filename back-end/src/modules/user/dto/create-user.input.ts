import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
	@Field(() => String)
	firstName: string;

	@Field(() => String)
	lastName: string;

	@Field(() => String)
	email: string;

	@Field(() => String)
	picture: string;

	@Field(() => String)
	from: string;
}
