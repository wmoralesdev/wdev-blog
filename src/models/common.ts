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

export interface BlockContentModel extends TypedModel {
    children: BlockContentModel[];
    marks: string[];
    text: string;
    markDefs?: string[];
    style?: string;
    language?: string;
    code?: string;
    highlightedLines?: number[];
    url?: string;
}
