import * as _libsql_client from '@libsql/client';
import * as drizzle_orm_libsql from 'drizzle-orm/libsql';
import * as schema from '@growth-engine/types/schema';
import { BlogPost, BlogAuthor, Form, BusinessConfig } from '@growth-engine/types';

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
declare function getAuthorPosts(db: ClientDb, authorSlug: string, opts?: {
    locale?: string | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
}): Promise<BlogPost[]>;

declare function getActiveForms(db: ClientDb): Promise<Form[]>;
declare function getFormBySlug(db: ClientDb, slug: string): Promise<Form | null>;

declare function getBusinessConfig(db: ClientDb): Promise<BusinessConfig | null>;

export { type ClientDb, type GetBlogPostsOptions, GrowthEngineHandler, type GrowthEngineHandlerOptions, getActiveForms, getAuthorPosts, getBlogAuthor, getBlogAuthors, getBlogPost, getBlogPostCount, getBlogPosts, getBusinessConfig, getClientDb, getFormBySlug };
