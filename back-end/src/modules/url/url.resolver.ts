import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUrlInput } from './dto/create-url.input';
import { Url } from './entities/url.entity';
import { UrlService } from './url.service';

@Resolver(() => Url)
export class UrlResolver {
	constructor(private readonly urlService: UrlService) {}

	@Mutation(() => Url)
	createUrl(@Args('createUrlInput') createUrlInput: CreateUrlInput) {
		return this.urlService.create(createUrlInput);
	}

	@Query(() => [Url], { name: 'url' })
	findAll() {
		return this.urlService.findAll();
	}

	@Query(() => Url, { name: 'url' })
	findOne(@Args('id', { type: () => Int }) id: number) {
		return this.urlService.findOne(id);
	}

	@Mutation(() => Url)
	removeUrl(@Args('id', { type: () => Int }) id: number) {
		return this.urlService.remove(id);
	}
}
