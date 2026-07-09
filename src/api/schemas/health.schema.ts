import { z } from 'zod';

export const healthSchema = z.object({
  status: z.string(),
});

export type Health = z.infer<typeof healthSchema>;
