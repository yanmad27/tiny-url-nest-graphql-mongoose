import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { BaseEntity } from 'src/shared/base.entity';
import { BaseRepositoryInterface } from './base.interface.repository';

export abstract class BaseRepositoryAbstract<T extends BaseEntity> implements BaseRepositoryInterface<T> {
	protected constructor(private readonly model: Model<T>) {
		this.model = model;
	}

	create(dto: T | any): Promise<T> {
		const createdData = new this.model(dto);
		return createdData.save();
	}

	findOneById(id: string): Promise<T> {
		return this.model.findOne({ id, deletedAt: null }).exec();
	}

	findOneByCondition(condition = {}): Promise<T> {
		return this.model
			.findOne({
				...condition,
				deletedAt: null,
			})
			.exec();
	}

	async findAll(condition?: FilterQuery<T>, options?: QueryOptions<T>): Promise<T[]> {
		return this.model.find({ ...condition, deletedAt: null }, options?.projection, options).exec();
	}

	async update(id: string, dto: Partial<T>): Promise<T> {
		return await this.model.findOneAndUpdate({ _id: id, deletedAt: null }, dto, { new: true });
	}

	async softDelete(id: string): Promise<boolean> {
		const deleteItem = await this.model.findById(id);
		if (!deleteItem) {
			return false;
		}

		return !!(await this.model.findByIdAndUpdate<T>(id, { deletedAt: new Date() }).exec());
	}

	async permanentlyDelete(id: string): Promise<boolean> {
		const deleteItem = await this.model.findById(id);
		if (!deleteItem) {
			return false;
		}
		return !!(await this.model.findByIdAndDelete(id));
	}
}
