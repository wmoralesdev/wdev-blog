import { z } from 'zod';
import { NextRequest } from 'next/server';

export interface CreateSignatureRequest extends Omit<NextRequest, 'body'> {
  body: {
    email: string;
    content: string;
  };
}

export const CreateSignatureSchema = z.object({
  email: z.string().email(),
  content: z.string().max(125),
});

export interface VoteSignatureRequest extends Omit<NextRequest, 'body'> {
  body: {
    id: number;
    vote: 'UP' | 'DOWN';
  };
}

export const VoteSignatureSchema = z.object({
  id: z.number(),
  vote: z.enum(['UP', 'DOWN']),
});
