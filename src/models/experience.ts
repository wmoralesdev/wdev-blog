import { LocatedStringModel, SanityModel, TimestampedModel } from './common';

export interface ExperienceModel extends SanityModel, TimestampedModel {
    description: LocatedStringModel;
    startDate: string;
    endDate: string;
    role: LocatedStringModel;
    workplace: string;
}
