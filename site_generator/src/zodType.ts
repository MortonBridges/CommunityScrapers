// Generated by ts-to-zod
import { z } from "zod";

const cookieSchema = z.object({
  Name: z.string(),
  Domain: z.string(),
  ValueRandom: z.number().optional(),
  Value: z.string().optional(),
  Path: z.string().optional(),
});

const urlScrapeActionsSchema = z.union([
  z.literal("scrapeXPath"),
  z.literal("scrapeJson"),
  z.literal("stash"),
]);

export const singleActionsSchema = z.union([
  z.literal("performerByName"),
  z.literal("performerByFragment"),
  z.literal("sceneByName"),
  z.literal("sceneByQueryFragment"),
  z.literal("sceneByFragment"),
  z.literal("galleryByFragment"),
  z.literal("imageByFragment"),
]);

export const arrayActionsSchema = z.union([
  z.literal("performerByURL"),
  z.literal("sceneByURL"),
  z.literal("groupByURL"),
  z.literal("movieByURL"),
  z.literal("galleryByURL"),
  z.literal("imageByURL"),
]);

const replaceRegexSchema = z.object({
  regex: z.string(),
  with: z.string().nullable(),
});

const baseUrlScraperSchema = z.object({
  action: urlScrapeActionsSchema,
  scraper: z.string(),
  queryURLReplace: z.record(z.array(replaceRegexSchema)).optional(),
});

const byFragmentScraperSchema = baseUrlScraperSchema.extend({
  queryURL: z.string(),
});

const byNameScraperSchema = byFragmentScraperSchema;

export const scriptScraperSchema = z.object({
  action: z.literal("script"),
  script: z.array(z.string()),
});

export const byUrlScraperSchema = baseUrlScraperSchema.extend({
  url: z.array(z.string()),
  queryURL: z.string().optional(),
});

const xPathScraperSchema = z.record(
  z.object({
    fixed: z.string().optional(),
    selector: z.string().optional(),
    postProcess: z
      .array(
        z.object({
          replace: z.array(replaceRegexSchema).optional(),
          parseDate: z.string(),
        }),
      )
      .optional(),
    concat: z.string().optional(),
  }),
);

export const byNameScraperDefnSchema = z.union([
  scriptScraperSchema,
  byNameScraperSchema,
]);

export const byFragmentScraperDefnSchema = z.union([
  scriptScraperSchema,
  byFragmentScraperSchema,
]);

export const byUrlScraperDefnSchema = z.union([
  scriptScraperSchema,
  byUrlScraperSchema,
]);

const driverConfigSchema = z.object({
  useCDP: z.boolean().optional(),
  sleep: z.number().optional(),
  clicks: z
    .array(
      z.object({
        xpath: z.string(),
        sleep: z.number().optional(),
      }),
    )
    .optional(),
  cookies: z
    .array(
      z.object({
        CookieURL: z.string().optional(),
        Cookies: z.array(cookieSchema).optional(),
      }),
    )
    .optional(),
  headers: z
    .array(
      z.object({
        Key: z.string(),
        Value: z.string(),
      }),
    )
    .optional(),
});

export const anyScraperSchema = z.union([
  byNameScraperSchema,
  byFragmentScraperSchema,
  byUrlScraperSchema,
  scriptScraperSchema,
]);

export const ymlScraperSchema = z.record(z.any()).and(
  z.object({
    filename: z.string(),
    name: z.string(),
    scrapes: z.array(z.string()).optional(),
    driver: driverConfigSchema.optional(),
    xPathScrapers: z
      .union([xPathScraperSchema, z.array(xPathScraperSchema)])
      .optional(),
    debug: z
      .object({
        printHTML: z.boolean().optional(),
      })
      .optional(),
    performerByName: byNameScraperDefnSchema.optional(),
    performerByFragment: byFragmentScraperDefnSchema.optional(),
    performerByURL: z.array(byUrlScraperDefnSchema).optional(),
    sceneByName: byNameScraperDefnSchema.optional(),
    sceneByQueryFragment: byFragmentScraperDefnSchema.optional(),
    sceneByFragment: byFragmentScraperDefnSchema.optional(),
    sceneByURL: z.array(byUrlScraperDefnSchema).optional(),
    groupByURL: z.array(byUrlScraperDefnSchema).optional(),
    movieByURL: z.array(byUrlScraperDefnSchema).optional(),
    galleryByFragment: byFragmentScraperDefnSchema.optional(),
    galleryByURL: z.array(byUrlScraperDefnSchema).optional(),
    imageByURL: z.array(byUrlScraperDefnSchema).optional(),
    imageByFragment: byFragmentScraperSchema.optional(),
  }),
);
