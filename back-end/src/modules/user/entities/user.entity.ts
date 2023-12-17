import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooSchema } from 'mongoose';

@ObjectType()
@Schema()
export class User {
	@Field(() => String)
	_id: MongooSchema.Types.ObjectId;

	@Field(() => String)
	@Prop()
	firstName: string;

	@Field(() => String)
	@Prop()
	lastName: string;

	@Field(() => String)
	@Prop()
	picture: string;

	@Field(() => String)
	@Prop({ unique: true })
	email: string;

	@Field(() => String)
	@Prop()
	password: string;

	@Field(() => String)
	@Prop()
	from: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
