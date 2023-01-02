import { AuthorModel } from './author';
import { BlockContentModel, SanityModel, TimestampedModel } from './common';

export interface PostModel extends SanityModel, TimestampedModel {
    author: AuthorModel;
    body: BlockContentModel[];
    categories: CategoryModel[];
    coverImage: string;
    miniatureImage: string;
    metaImage: string;
    slug: SlugModel;
    title: string;
    description: string;
}

interface SlugModel {
    _type: string;
    current: string;
}

interface CategoryModel {
    title: string;
}
