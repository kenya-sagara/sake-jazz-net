import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const events = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/events" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    endTime: z.string().optional(),
    location: z.string(),
    address: z.string().optional(),
    access: z.string().optional(),
    mapUrl: z.string().url().optional(),
    tickets: z
      .array(
        z.object({
          label: z.string(),
          amount: z.number(),
          paymentUrl: z.string().url().optional(),
          capacity: z.number().optional(),
          note: z.string().optional(),
        })
      )
      .optional(),
    price: z.number(),
    capacity: z.number().optional(),
    stripeUrl: z.string().url().optional(),
    formUrl: z.string().url().optional(),
    organizer: z.string().optional(),
    sponsor: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    schedule: z
      .array(
        z.object({
          time: z.string(),
          label: z.string(),
        })
      )
      .optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { events };
