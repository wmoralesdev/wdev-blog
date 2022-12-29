import { BlockContentModel, SanityModel } from './common';

export interface AuthorModel extends SanityModel {
    image: string;
    name: string;
    bio: BlockContentModel[];
}
