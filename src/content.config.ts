import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

type NavItem = {
  label: string;
  href: string;
  order: number;
  children?: NavItem[];
};

const navItemSchema: z.ZodType<NavItem> = z.lazy(() =>
  z.object({
    label: z.string(),
    href: z.string(),
    order: z.number(),
    children: z.array(navItemSchema).optional()
  })
);

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    eyebrow: z.string().optional(),
    heroTitle: z.string().optional(),
    heroTitleAccent: z.string().optional(),
    heroSubtitle: z.string().optional(),
    heroImage: z.string().optional(),
    heroImages: z.array(z.string()).optional(),
    heroActions: z
      .array(
        z.object({
          label: z.string(),
          href: z.string(),
          variant: z.enum(['filled', 'outline']).optional()
        })
      )
      .optional(),
    heroActionsTitle: z.string().optional(),
    primaryCtaLabel: z.string().optional(),
    primaryCtaHref: z.string().optional(),
    secondaryCtaLabel: z.string().optional(),
    secondaryCtaHref: z.string().optional(),
    aboutTitle: z.string().optional(),
    aboutImage: z.string().optional(),
    aboutImageColor: z.string().optional(),
    aboutCtaLabel: z.string().optional(),
    aboutCtaHref: z.string().optional(),
    playlistEyebrow: z.string().optional(),
    playlistTitle: z.string().optional(),
    playlistDescription: z.string().optional(),
    catalogueTitle: z.string().optional(),
    catalogueDescription: z.string().optional(),
    pianoRepertoire: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
          youtubeUrl: z.string().optional(),
          image: z.string().optional()
        })
      )
      .optional(),
    pianoImprovisations: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
          youtubeUrl: z.string().optional(),
          image: z.string().optional()
        })
      )
      .optional(),
    downloads: z
      .array(
        z.object({
          label: z.string(),
          href: z.string(),
          description: z.string().optional()
        })
      )
      .optional(),
    profileImage: z.string().optional(),
    bioVersions: z
      .object({
        short: z.string(),
        long: z.string(),
        fun: z.string()
      })
      .optional(),
    careerLines: z
      .array(
        z.object({
          label: z.string(),
          summary: z.string(),
          facts: z.array(z.string())
        })
      )
      .optional(),
    missionValues: z
      .array(
        z.object({
          eyebrow: z.string(),
          title: z.string(),
          text: z.string()
        })
      )
      .optional(),
    testimonials: z
      .array(
        z.object({
          quote: z.string(),
          name: z.string(),
          role: z.string().optional()
        })
      )
      .optional(),
    cvHighlights: z
      .array(
        z.object({
          label: z.string(),
          value: z.string()
        })
      )
      .optional(),
    timeline: z
      .array(
        z.object({
          year: z.string(),
          title: z.string().optional(),
          description: z.string().optional(),
          location: z.string().optional(),
          events: z
            .array(
              z.object({
                label: z.string().optional(),
                title: z.string(),
                description: z.string(),
                location: z.string().optional()
              })
            )
            .optional()
        })
      )
      .optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional()
  })
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    featured: z.boolean(),
    order: z.number(),
    coverImage: z.string().optional(),
    url: z.string().url().optional(),
    year: z.union([z.number(), z.string()]).optional(),
    role: z.string().optional(),
    tags: z.array(z.string()).optional()
  })
});

const music = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/music' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    year: z.union([z.number(), z.string()]).optional(),
    type: z.string().optional(),
    category: z.string().optional(),
    featuredGroup: z.enum(['concert', 'media', 'jazz', 'piano', 'improvisation']).optional(),
    duration: z.string().optional(),
    instrumentation: z.string().optional(),
    details: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
    coverImage: z.string().optional(),
    url: z.string().url().optional(),
    audioUrl: z.string().optional(),
    youtubeUrl: z.string().optional(),
    scoreUrl: z.string().optional(),
    storeUrl: z.string().optional(),
    order: z.number().optional()
  })
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    image: z.string().optional(),
    readTime: z.string().optional(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
    pinned: z.boolean().optional(),
    draft: z.boolean().optional()
  })
});

const site = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/site' }),
  schema: z.object({
    brandName: z.string().optional(),
    brandTagline: z.string().optional(),
    logo: z.string().optional(),
    footerText: z.string().optional(),
    copyrightText: z.string().optional(),
    socialLinks: z
      .array(
        z.object({
          label: z.string(),
          href: z.string(),
          icon: z
            .enum(['spotify', 'youtube', 'instagram', 'facebook', 'substack', 'bluesky', 'bandcamp', 'linkedin', 'mail'])
            .optional(),
          enabled: z.boolean().optional(),
          showInHero: z.boolean().optional(),
          showInFooter: z.boolean().optional()
        })
      )
      .optional(),
    legalLinks: z
      .array(
        z.object({
          label: z.string(),
          href: z.string()
        })
      )
      .optional(),
    mainNav: z
      .array(navItemSchema)
      .optional()
  })
});

export const collections = {
  site,
  pages,
  projects,
  music,
  writing
};
