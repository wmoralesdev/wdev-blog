import { z } from 'zod';
import { NextRequest } from 'next/server';

export interface CreateUserRequest extends Omit<NextRequest, 'body'> {
  body: {
    email: string;
    name: string;
    image: string;
    source: string;
  };
}

export const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  image: z.string(),
  source: z
    .enum(['github', 'google'])
    .transform((val) => val.toUpperCase() as 'GITHUB' | 'GOOGLE'),
});
