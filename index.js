var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/handler/routes/content.ts
import { eq, desc } from "drizzle-orm";

// ../types/src/schema.ts
var schema_exports = {};
__export(schema_exports, {
  analytics: () => analytics,
  blogPosts: () => blogPosts,
  businessConfig: () => businessConfig,
  formSubmissions: () => formSubmissions,
  forms: () => forms,
  schemaVersion: () => schemaVersion,
  socialPosts: () => socialPosts
});
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
var blogPosts = sqliteTable("blog_posts", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  translations: text("translations"),
  status: text("status", { enum: ["draft", "published", "archived"] }).notNull().default("draft"),
  heroImageUrl: text("hero_image_url"),
  seoTitle: text("seo_title"),
  seoDesc: text("seo_desc"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var socialPosts = sqliteTable("social_posts", {
  id: text("id").primaryKey(),
  platform: text("platform", { enum: ["instagram", "linkedin", "facebook"] }).notNull(),
  content: text("content").notNull(),
  scheduledAt: integer("scheduled_at", { mode: "timestamp" }),
  status: text("status", { enum: ["pending", "published", "cancelled"] }).notNull().default("pending"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
});
var businessConfig = sqliteTable("business_config", {
  id: text("id").primaryKey().default("config"),
  hours: text("hours"),
  contact: text("contact"),
  address: text("address"),
  seo: text("seo"),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var analytics = sqliteTable("analytics", {
  id: text("id").primaryKey(),
  eventType: text("event_type").notNull(),
  page: text("page"),
  sessionId: text("session_id"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
});
var forms = sqliteTable("forms", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  fields: text("fields").notNull(),
  // JSON array of FormField[]
  settings: text("settings"),
  // JSON FormSettings object
  status: text("status", { enum: ["active", "archived"] }).notNull().default("active"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var formSubmissions = sqliteTable("form_submissions", {
  id: text("id").primaryKey(),
  formId: text("form_id").notNull(),
  data: text("data").notNull(),
  // JSON object of field values
  metadata: text("metadata"),
  // JSON: IP, user agent, referrer
  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
});
var schemaVersion = sqliteTable("_schema_version", {
  id: text("id").primaryKey().default("version"),
  version: integer("version").notNull(),
  migratedAt: integer("migrated_at", { mode: "timestamp" }).notNull()
});

// src/handler/db.ts
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
function getClientDb(url, authToken) {
  const client = createClient({ url, authToken });
  return drizzle(client, { schema: schema_exports });
}

// src/handler/routes/content.ts
var CACHE_HEADERS = {
  "Cache-Control": "s-maxage=60, stale-while-revalidate=300"
};
async function handleContent(request, tursoUrl, tursoAuthToken) {
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get("type");
    const slug = url.searchParams.get("slug");
    const platform = url.searchParams.get("platform");
    const db = getClientDb(tursoUrl, tursoAuthToken);
    if (type === "blog") {
      if (slug) {
        const post = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
        return Response.json(post[0] ?? null, { headers: CACHE_HEADERS });
      }
      const posts = await db.select().from(blogPosts).where(eq(blogPosts.status, "published")).orderBy(desc(blogPosts.createdAt)).limit(20);
      return Response.json(posts, { headers: CACHE_HEADERS });
    }
    if (type === "social") {
      if (platform === "instagram" || platform === "linkedin" || platform === "facebook") {
        const posts2 = await db.select().from(socialPosts).where(eq(socialPosts.platform, platform)).orderBy(desc(socialPosts.createdAt)).limit(20);
        return Response.json(posts2, { headers: CACHE_HEADERS });
      }
      const posts = await db.select().from(socialPosts).orderBy(desc(socialPosts.createdAt)).limit(20);
      return Response.json(posts, { headers: CACHE_HEADERS });
    }
    return Response.json({ error: "Invalid content type" }, { status: 400 });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// src/handler/routes/config.ts
var CACHE_HEADERS2 = {
  "Cache-Control": "s-maxage=60, stale-while-revalidate=300"
};
async function handleConfig(_request, tursoUrl, tursoAuthToken) {
  try {
    const db = getClientDb(tursoUrl, tursoAuthToken);
    const rows = await db.select().from(businessConfig).limit(1);
    const config = rows[0] ?? null;
    if (!config) {
      return Response.json({ error: "No business config found" }, { status: 404 });
    }
    return Response.json(
      {
        ...config,
        hours: config.hours ? JSON.parse(config.hours) : null,
        contact: config.contact ? JSON.parse(config.contact) : null,
        address: config.address ? JSON.parse(config.address) : null,
        seo: config.seo ? JSON.parse(config.seo) : null
      },
      { headers: CACHE_HEADERS2 }
    );
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// src/handler/routes/forms.ts
import { eq as eq2 } from "drizzle-orm";
async function handleForms(request, tursoUrl, tursoAuthToken) {
  try {
    const url = new URL(request.url);
    const action = url.searchParams.get("action");
    const slug = url.searchParams.get("slug");
    const db = getClientDb(tursoUrl, tursoAuthToken);
    if (action === "list") {
      const rows = await db.select().from(forms).where(eq2(forms.status, "active"));
      return Response.json(rows);
    }
    if (action === "get" && slug) {
      const rows = await db.select().from(forms).where(eq2(forms.slug, slug)).limit(1);
      return Response.json(rows[0] ?? null);
    }
    if (request.method === "POST" && action === "submit" && slug) {
      const body = await request.json();
      const data = body.data;
      if (!data || typeof data !== "object") {
        return Response.json({ error: "Missing or invalid data field" }, { status: 400 });
      }
      const formRows = await db.select().from(forms).where(eq2(forms.slug, slug)).limit(1);
      const form = formRows[0];
      if (!form) {
        return Response.json({ error: "Form not found" }, { status: 404 });
      }
      const fields = JSON.parse(form.fields);
      const missingFields = [];
      for (const field of fields) {
        if (field.required) {
          const value = data[field.name];
          if (value === void 0 || value === null || value === "") {
            missingFields.push(field.label);
          }
        }
      }
      if (missingFields.length > 0) {
        return Response.json(
          { error: `Missing required fields: ${missingFields.join(", ")}` },
          { status: 400 }
        );
      }
      const id = crypto.randomUUID();
      await db.insert(formSubmissions).values({
        id,
        formId: form.id,
        data: JSON.stringify(data),
        createdAt: /* @__PURE__ */ new Date()
      });
      return Response.json({ ok: true, id });
    }
    return Response.json({ error: "Invalid action" }, { status: 400 });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// src/handler/routes/jobs.ts
async function handleJobs(request, brainApiKey) {
  try {
    const brainBase = globalThis.process?.env?.BRAIN_API_URL ?? "https://brain.yourapp.com";
    if (request.method === "POST") {
      const body = await request.json();
      const res2 = await fetch(`${brainBase}/api/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${brainApiKey}`
        },
        body: JSON.stringify(body)
      });
      const data2 = await res2.json();
      return Response.json(data2, { status: res2.status });
    }
    const url = new URL(request.url);
    const segments = url.pathname.split("/");
    const jobId = segments[segments.length - 1];
    if (!jobId) {
      return Response.json({ error: "Job ID required" }, { status: 400 });
    }
    const res = await fetch(`${brainBase}/api/jobs/${encodeURIComponent(jobId)}`, {
      headers: {
        Authorization: `Bearer ${brainApiKey}`
      }
    });
    const data = await res.json();
    return Response.json(data, { status: res.status });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// src/handler/routes/analytics.ts
import { nanoid } from "nanoid";
async function handleAnalytics(request, tursoUrl, tursoAuthToken) {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }
  try {
    const body = await request.json();
    if (!body.eventType) {
      return Response.json({ error: "eventType is required" }, { status: 400 });
    }
    const db = getClientDb(tursoUrl, tursoAuthToken);
    await db.insert(analytics).values({
      id: nanoid(),
      eventType: body.eventType,
      page: body.page ?? null,
      sessionId: body.sessionId ?? null,
      createdAt: /* @__PURE__ */ new Date()
    });
    return Response.json({ success: true }, { status: 201 });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// src/handler/index.ts
function resolveRoute(pathname) {
  const match = pathname.match(/\/api\/rs\/(.+)/);
  if (!match?.[1]) return null;
  return match[1];
}
function GrowthEngineHandler(options) {
  const { brainApiKey, tursoUrl, tursoAuthToken } = options;
  async function handleRequest(request) {
    const url = new URL(request.url);
    const route = resolveRoute(url.pathname);
    if (!route) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
    if (route === "content") {
      return handleContent(request, tursoUrl, tursoAuthToken);
    }
    if (route === "config") {
      return handleConfig(request, tursoUrl, tursoAuthToken);
    }
    if (route.startsWith("jobs")) {
      return handleJobs(request, brainApiKey);
    }
    if (route === "analytics") {
      return handleAnalytics(request, tursoUrl, tursoAuthToken);
    }
    if (route.startsWith("forms")) {
      return handleForms(request, tursoUrl, tursoAuthToken);
    }
    if (route === "sdk-status") {
      const brainBase = globalThis.process?.env?.BRAIN_API_URL ?? "https://brain.yourapp.com";
      const res = await fetch(`${brainBase}/api/sdk-versions`);
      const data = await res.json();
      return Response.json(data, { status: res.status });
    }
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  return {
    GET: handleRequest,
    POST: handleRequest
  };
}
export {
  GrowthEngineHandler,
  getClientDb
};
//# sourceMappingURL=index.js.map