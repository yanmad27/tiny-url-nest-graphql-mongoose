import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/modules/user/entities/user.entity';
import { BaseRepositoryAbstract } from './base/base.abstract.repository';

@Injectable()
export class UserRepository extends BaseRepositoryAbstract<User> {
	constructor(
		@InjectModel(User.name)
		private readonly userModel: Model<User>,
	) {
		super(userModel);
	}
}
