import { z } from "zod";

const User = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type User = z.infer<typeof User>;
