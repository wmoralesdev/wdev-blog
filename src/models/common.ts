export interface SanityModel extends TypedModel {
    _id: string;
}

export interface TypedModel {
    _type?: string;
}

export interface RefModel {
    _ref: string;
}

export interface TimestampedModel {
    _createdAt: string;
    _updatedAt: string;
}

export interface LocatedStringModel extends TypedModel {
    en: string;
    es: string;
}
