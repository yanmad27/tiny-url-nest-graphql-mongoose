import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooSchema } from 'mongoose';

@ObjectType()
@Schema()
export class Url {
	@Field(() => String)
	_id: MongooSchema.Types.ObjectId;

	@Field(() => String)
	@Prop()
	fullUrl: string;

	@Field(() => String)
	@Prop()
	email: string;

	@Field(() => String)
	@Prop({ unique: true })
	@Prop()
	shortUrl: string;

	@Field(() => Date)
	@Prop()
	expireAt: Date;
}

export type UrlDocument = Url & Document;
export const UrlSchema = SchemaFactory.createForClass(Url);
