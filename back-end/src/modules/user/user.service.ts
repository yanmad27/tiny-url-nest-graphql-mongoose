import { Injectable } from '@nestjs/common';
import { CreateUserInput } from 'src/modules/user/dto/create-user.input';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}
	create(createUserInput: CreateUserInput) {
		return this.userRepository.create(createUserInput);
	}
	findAll() {
		return this.userRepository.findAll();
	}
	findOne(email: string) {
		return this.userRepository.findOneByCondition({ email });
	}
	// update(id: number, updateUserInput: UpdateUserInput) {
	// 	return `This action updates a #${id} user`;
	// }
	// remove(id: number) {
	// 	return `This action removes a #${id} user`;
	// }
}
