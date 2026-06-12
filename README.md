# @growth-engine/sdk-server

Server-side request handler for Growth Engine. Provides API routes for content, forms, CRM, analytics, business config, and job management, backed by a per-tenant Turso (SQLite) database.

## Installation

```bash
npm install recursive-solutions-ai/growth-engine-sdk-server
```

## Quick Start

Create a Next.js catch-all API route at `app/api/rs/[...path]/route.ts`:

```ts
import { GrowthEngineHandler } from '@growth-engine/sdk-server'

const handler = GrowthEngineHandler({
  brainApiUrl: process.env.BRAIN_API_URL,
  brainApiKey: process.env.BRAIN_API_KEY,
  tursoUrl: process.env.TURSO_DATABASE_URL,
  tursoAuthToken: process.env.TURSO_AUTH_TOKEN,
})

export const GET = handler.GET
export const POST = handler.POST
```

That's it. The handler routes requests to `/api/rs/*` and returns JSON responses.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `BRAIN_API_URL` | Yes | URL of the Growth Engine Brain API (e.g. `https://brain.yourapp.com`) |
| `BRAIN_API_KEY` | Yes | API key for authenticating with the Brain API |
| `TURSO_DATABASE_URL` | Yes | Turso database URL (remote URL or local `file:` path) |
| `TURSO_AUTH_TOKEN` | Yes | Auth token for the Turso database |

All four variables must be set. If any are missing, the handler runs in **disabled mode** -- it returns empty data with appropriate status codes instead of throwing errors.

## API Routes

All routes are served under `/api/rs/`.

### GET `/api/rs/content`

Fetch blog posts, authors, or social media content.

| Param | Type | Description |
|-------|------|-------------|
| `type` | `'blog'` \| `'blog-authors'` \| `'social'` | Content type to fetch |
| `slug` | string | Fetch a single item by slug |
| `platform` | `'instagram'` \| `'linkedin'` \| `'facebook'` | Filter social posts by platform |
| `locale` | string | Language code (default: `'en'`) |
| `limit` | number | Results per page (default: 20, max: 5000) |
| `offset` | number | Pagination offset |
| `fields` | string | Comma-separated field whitelist for blog posts |
| `count` | `'true'` | Return `{ count: number }` instead of full results |

Responses are cached with `Cache-Control: s-maxage=60, stale-while-revalidate=300`.

### GET `/api/rs/config`

Returns the business configuration record with parsed JSON fields (`hours`, `contact`, `address`, `seo`).

### GET/POST `/api/rs/forms`

| Param | Type | Description |
|-------|------|-------------|
| `action` | `'list'` \| `'get'` \| `'submit'` | Operation to perform |
| `slug` | string | Form slug (required for `get` and `submit`) |

**GET `?action=list`** -- Returns all active forms.

**GET `?action=get&slug=contact`** -- Returns a single form definition.

**POST `?action=submit&slug=contact`** -- Submit form data:
```json
{
  "data": {
    "email": "user@example.com",
    "name": "Jane Doe"
  }
}
```
Validates required fields, stores the submission, auto-creates a CRM contact if email/name data is present, and writes an audit log entry. Returns `{ ok: true, id: "..." }`.

### POST `/api/rs/analytics`

Track an analytics event:
```json
{
  "eventType": "page_view",
  "page": "/blog/my-post",
  "sessionId": "abc123"
}
```

### POST `/api/rs/crm?action=push-lead`

Create or deduplicate a CRM contact:
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "company": "Acme"
}
```
Requires at least `firstName` or `email`. Deduplicates by email. Returns `{ ok: true, contactId: "...", existing: false }`.

### GET/POST `/api/rs/jobs`

**GET `/api/rs/jobs/{jobId}`** -- Check job status (proxied to Brain API).

**POST `/api/rs/jobs`** -- Create a new job (proxied to Brain API).

### GET `/api/rs/sdk-status`

Returns the current SDK version and Brain API connectivity status:
```json
{
  "sdkVersion": "0.1.1",
  "manifest": { "latest": "0.1.1", "deprecated": [], "unsupported": [] }
}
```

## Exports

```ts
import { GrowthEngineHandler } from '@growth-engine/sdk-server'
import type { GrowthEngineHandlerOptions } from '@growth-engine/sdk-server'
import { getClientDb } from '@growth-engine/sdk-server'
```

| Export | Description |
|--------|-------------|
| `GrowthEngineHandler(options)` | Returns `{ GET, POST }` request handlers |
| `getClientDb(url, authToken)` | Returns a Drizzle ORM instance connected to the Turso database |

## CLI: `growth-engine-pull-forms`

Generate TypeScript form schemas from the Brain API:

```bash
npx growth-engine-pull-forms --output src/generated/forms.ts
```

Requires `BRAIN_API_KEY` and `BRAIN_URL` environment variables (reads `.env`).

Generates:
- Zod validation schemas for each form
- TypeScript types (`FormData` types)
- A `FormSlugs` constant for type-safe slug references

```ts
// Generated output example
import { contactFormSchema, FormSlugs } from './generated/forms'
import type { ContactFormData } from './generated/forms'

const data: ContactFormData = { email: 'jane@example.com', name: 'Jane' }
contactFormSchema.parse(data)

FormSlugs.contactForm // 'contact-form'
```

## Graceful Degradation

If any required environment variable is missing, the handler enters **disabled mode**:

- Content routes return empty arrays or `null`
- Form submit returns `{ ok: false, error: 'SDK not configured' }`
- Analytics returns `{ success: true }` (no-op)
- SDK status returns `{ sdkVersion: "...", disabled: true }`
- A warning is logged to the console listing the missing variables

This lets you develop locally without a full Brain API setup.

## Requirements

- Node.js 20+
- Next.js 13+ (App Router) or any framework that supports Web `Request`/`Response` handlers
- A provisioned Turso database (provided by Growth Engine Brain)

## License

Private
