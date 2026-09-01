import * as _libsql_client from '@libsql/client';
import * as drizzle_orm_libsql from 'drizzle-orm/libsql';
import * as schema from '@growth-engine/types/schema';
import { BlogPost, BlogAuthor, Page, Form, BusinessConfig, RobotsPolicyResponse } from '@growth-engine/types';

interface GrowthEngineHandlerOptions {
    brainApiUrl: string | undefined;
    brainApiKey: string | undefined;
    tursoUrl: string | undefined;
    tursoAuthToken: string | undefined;
}
declare function GrowthEngineHandler(options: GrowthEngineHandlerOptions): {
    GET: (request: Request) => Promise<Response>;
    POST: (request: Request) => Promise<Response>;
};

declare function getClientDb(url: string, authToken: string): drizzle_orm_libsql.LibSQLDatabase<typeof schema> & {
    $client: _libsql_client.Client;
};

type ClientDb = ReturnType<typeof getClientDb>;
interface GetBlogPostsOptions {
    locale?: string | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
}
declare function getBlogPosts(db: ClientDb, opts?: GetBlogPostsOptions): Promise<BlogPost[]>;
declare function getBlogPost(db: ClientDb, slug: string, locale?: string | undefined): Promise<BlogPost | null>;
declare function getBlogPostCount(db: ClientDb, locale?: string | undefined): Promise<number>;
declare function getBlogAuthors(db: ClientDb): Promise<BlogAuthor[]>;
declare function getBlogAuthor(db: ClientDb, slug: string): Promise<BlogAuthor | null>;
declare function getBlogAuthorById(db: ClientDb, id: string): Promise<BlogAuthor | null>;
declare function getAuthorPosts(db: ClientDb, authorSlug: string, opts?: {
    locale?: string | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
}): Promise<BlogPost[]>;

interface GetLandingPagesOptions {
    limit?: number | undefined;
    offset?: number | undefined;
}
declare function getLandingPages(db: ClientDb, opts?: GetLandingPagesOptions): Promise<Page[]>;
declare function getLandingPage(db: ClientDb, slug: string): Promise<Page | null>;

declare function getActiveForms(db: ClientDb): Promise<Form[]>;
declare function getFormBySlug(db: ClientDb, slug: string): Promise<Form | null>;

declare function getBusinessConfig(db: ClientDb): Promise<BusinessConfig | null>;

/**
 * The public-safe projection of a newsletter issue. Sender config, scheduling
 * internals, and per-recipient counts are deliberately excluded — the client
 * site only ever sees what belongs on a published archive page.
 */
interface PublicNewsletterIssue {
    id: string;
    slug: string;
    subject: string;
    previewText: string | null;
    content: string;
    sentAt: Date | null;
}
interface GetNewsletterIssuesOptions {
    limit?: number | undefined;
    offset?: number | undefined;
}
declare function getNewsletterIssues(db: ClientDb, opts?: GetNewsletterIssuesOptions): Promise<PublicNewsletterIssue[]>;
declare function getNewsletterIssue(db: ClientDb, slug: string): Promise<PublicNewsletterIssue | null>;
declare function getNewsletterIssueCount(db: ClientDb): Promise<number>;

interface GetAiCrawlerRulesOptions {
    /** The Brain instance URL — pass process.env.BRAIN_API_URL. */
    brainApiUrl: string | undefined;
    /** The tenant API key — pass process.env.BRAIN_API_KEY. */
    brainApiKey: string | undefined;
    /** Next.js data-cache revalidate window in seconds (default 300). */
    revalidateSeconds?: number;
}
/** One robots.txt rule group, shaped to spread into MetadataRoute.Robots.rules. */
interface AiCrawlerRule {
    userAgent: string;
    allow?: string;
    disallow?: string;
}
/** Fetch the tenant's AI-crawler policy from the Brain. Null on any failure. */
declare function fetchRobotsPolicy(options: GetAiCrawlerRulesOptions): Promise<RobotsPolicyResponse | null>;
/**
 * PURE. Turn a policy into explicit per-bot robots.txt rule groups. A specific
 * `User-agent` group overrides any blanket `User-agent: *` rules, which is what
 * makes the policy authoritative for these bots. No policy (or no valid data)
 * → no extra rules, preserving the site's default robots behavior.
 */
declare function buildAiCrawlerRules(policy: RobotsPolicyResponse | null): AiCrawlerRule[];
/**
 * The one-call form for a client site's robots.ts: fetch the tenant policy and
 * return the rule groups to append after the default `*` rule. Returns `[]`
 * whenever no policy is set or anything fails.
 *
 *   const aiRules = await getAiCrawlerRules({
 *     brainApiUrl: process.env.BRAIN_API_URL,
 *     brainApiKey: process.env.BRAIN_API_KEY,
 *   })
 *   return { rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }, ...aiRules], ... }
 */
declare function getAiCrawlerRules(options: GetAiCrawlerRulesOptions): Promise<AiCrawlerRule[]>;

export { type AiCrawlerRule, type ClientDb, type GetAiCrawlerRulesOptions, type GetBlogPostsOptions, type GetLandingPagesOptions, type GetNewsletterIssuesOptions, GrowthEngineHandler, type GrowthEngineHandlerOptions, type PublicNewsletterIssue, buildAiCrawlerRules, fetchRobotsPolicy, getActiveForms, getAiCrawlerRules, getAuthorPosts, getBlogAuthor, getBlogAuthorById, getBlogAuthors, getBlogPost, getBlogPostCount, getBlogPosts, getBusinessConfig, getClientDb, getFormBySlug, getLandingPage, getLandingPages, getNewsletterIssue, getNewsletterIssueCount, getNewsletterIssues };
