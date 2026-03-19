import * as _libsql_client from '@libsql/client';
import * as drizzle_orm_libsql from 'drizzle-orm/libsql';
import * as schema from '@growth-engine/types/schema';

interface GrowthEngineHandlerOptions {
    brainApiKey: string;
    tursoUrl: string;
    tursoAuthToken: string;
}
declare function GrowthEngineHandler(options: GrowthEngineHandlerOptions): {
    GET: (request: Request) => Promise<Response>;
    POST: (request: Request) => Promise<Response>;
};

declare function getClientDb(url: string, authToken: string): drizzle_orm_libsql.LibSQLDatabase<typeof schema> & {
    $client: _libsql_client.Client;
};

export { GrowthEngineHandler, type GrowthEngineHandlerOptions, getClientDb };
