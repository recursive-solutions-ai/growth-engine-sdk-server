var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/handler/routes/content.ts
import { eq, desc, and, or, count as drizzleCount } from "drizzle-orm";

// ../types/src/schema.ts
var schema_exports = {};
__export(schema_exports, {
  analytics: () => analytics,
  auditLogs: () => auditLogs,
  blogAuthors: () => blogAuthors,
  blogPosts: () => blogPosts,
  businessConfig: () => businessConfig,
  contactSignals: () => contactSignals,
  crmActivities: () => crmActivities,
  crmChecklistRuns: () => crmChecklistRuns,
  crmChecklists: () => crmChecklists,
  crmContacts: () => crmContacts,
  crmDealStageHistory: () => crmDealStageHistory,
  crmDeals: () => crmDeals,
  crmOrganizations: () => crmOrganizations,
  crmPipelineStages: () => crmPipelineStages,
  embedSettings: () => embedSettings,
  embeds: () => embeds,
  expertChatMessages: () => expertChatMessages,
  expertChatSessions: () => expertChatSessions,
  experts: () => experts,
  files: () => files,
  formSubmissions: () => formSubmissions,
  forms: () => forms,
  kbEntries: () => kbEntries,
  kbEntryEmbeddings: () => kbEntryEmbeddings,
  kbEntryFiles: () => kbEntryFiles,
  kbEntryTags: () => kbEntryTags,
  kbGaps: () => kbGaps,
  kbTags: () => kbTags,
  nurtureApiTokens: () => nurtureApiTokens,
  nurtureFlows: () => nurtureFlows,
  nurtureRuns: () => nurtureRuns,
  schemaVersion: () => schemaVersion,
  signalBindings: () => signalBindings,
  socialIdeas: () => socialIdeas,
  socialPersonas: () => socialPersonas,
  socialPosts: () => socialPosts,
  variables: () => variables
});
import { sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core";
var blogAuthors = sqliteTable("blog_authors", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  email: text("email"),
  bio: text("bio"),
  avatarUrl: text("avatar_url"),
  websiteUrl: text("website_url"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var blogPosts = sqliteTable("blog_posts", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  urlPath: text("url_path"),
  title: text("title").notNull(),
  content: text("content").notNull(),
  language: text("language").notNull().default("en"),
  parentPostId: text("parent_post_id"),
  authorId: text("author_id"),
  status: text("status", { enum: ["draft", "published", "archived"] }).notNull().default("draft"),
  heroImageUrl: text("hero_image_url"),
  seoTitle: text("seo_title"),
  seoDesc: text("seo_desc"),
  keywords: text("keywords"),
  // JSON string[]
  publishedAt: integer("published_at", { mode: "timestamp" }),
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
var socialPersonas = sqliteTable("social_personas", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  type: text("type", { enum: ["company", "personal"] }).notNull(),
  platforms: text("platforms").notNull().default("[]"),
  // JSON: SocialPlatform[]
  profileUrls: text("profile_urls").notNull().default("{}"),
  // JSON: Partial<Record<SocialPlatform,string>>
  voiceGuidance: text("voice_guidance"),
  avatarUrl: text("avatar_url"),
  enabled: integer("enabled", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var socialIdeas = sqliteTable("social_ideas", {
  id: text("id").primaryKey(),
  personaId: text("persona_id").notNull(),
  platform: text("platform", { enum: ["linkedin", "x", "instagram", "facebook"] }).notNull(),
  content: text("content").notNull(),
  variationIndex: integer("variation_index").notNull(),
  assets: text("assets").notNull().default("[]"),
  // JSON: SocialAsset[]
  status: text("status", { enum: ["draft", "approved", "archived"] }).notNull().default("draft"),
  workflowRunId: text("workflow_run_id"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var businessConfig = sqliteTable("business_config", {
  id: text("id").primaryKey().default("config"),
  name: text("name"),
  description: text("description"),
  hours: text("hours"),
  contact: text("contact"),
  address: text("address"),
  phone: text("phone"),
  email: text("email"),
  website: text("website"),
  seo: text("seo"),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var variables = sqliteTable("variables", {
  id: text("id").primaryKey(),
  key: text("key").notNull(),
  value: text("value").notNull(),
  note: text("note"),
  scope: text("scope", { enum: ["company", "user"] }).notNull().default("company"),
  userId: text("user_id"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
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
var files = sqliteTable("files", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  gcsPath: text("gcs_path").notNull(),
  visibility: text("visibility", { enum: ["public", "private", "password"] }).notNull().default("private"),
  passwordHash: text("password_hash"),
  contentType: text("content_type").notNull(),
  sizeBytes: integer("size_bytes").notNull(),
  category: text("category", { enum: ["blog", "brand", "document", "general"] }).notNull().default("general"),
  blogPostId: text("blog_post_id"),
  uploadedBy: text("uploaded_by"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var crmOrganizations = sqliteTable("crm_organizations", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  website: text("website"),
  industry: text("industry"),
  size: text("size", { enum: ["1-10", "11-50", "51-200", "201-500", "500+"] }),
  phone: text("phone"),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  country: text("country"),
  notes: text("notes"),
  customFields: text("custom_fields"),
  // JSON Record<string, unknown>
  status: text("status", { enum: ["active", "archived"] }).notNull().default("active"),
  globalOrgDomain: text("global_org_domain"),
  globalSyncedAt: integer("global_synced_at", { mode: "timestamp" }),
  globalAutoRefresh: integer("global_auto_refresh", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var crmContacts = sqliteTable("crm_contacts", {
  id: text("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email"),
  phone: text("phone"),
  company: text("company"),
  organizationId: text("organization_id"),
  jobTitle: text("job_title"),
  source: text("source", { enum: ["form", "manual", "import", "sdk", "lead_finder", "embed"] }).notNull().default("manual"),
  sourceId: text("source_id"),
  ownerId: text("owner_id"),
  tags: text("tags"),
  // JSON string[]
  notes: text("notes"),
  status: text("status", { enum: ["active", "archived"] }).notNull().default("active"),
  customFields: text("custom_fields"),
  // JSON Record<string, unknown>
  globalPersonId: text("global_person_id"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var crmPipelineStages = sqliteTable("crm_pipeline_stages", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  order: integer("order").notNull(),
  color: text("color"),
  isDefault: integer("is_default", { mode: "boolean" }).notNull().default(false),
  isClosed: integer("is_closed", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
});
var crmDeals = sqliteTable("crm_deals", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  contactId: text("contact_id").notNull(),
  stageId: text("stage_id").notNull(),
  value: integer("value"),
  // in cents
  currency: text("currency").notNull().default("USD"),
  expectedCloseDate: integer("expected_close_date", { mode: "timestamp" }),
  closedAt: integer("closed_at", { mode: "timestamp" }),
  ownerId: text("owner_id"),
  tags: text("tags"),
  // JSON string[]
  notes: text("notes"),
  status: text("status", { enum: ["open", "won", "lost"] }).notNull().default("open"),
  customFields: text("custom_fields"),
  // JSON Record<string, unknown>
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var crmActivities = sqliteTable("crm_activities", {
  id: text("id").primaryKey(),
  type: text("type", { enum: ["call", "email", "email_received", "meeting", "note", "task", "form_submission", "pipeline_change", "status_change", "deal_created", "website_visit"] }).notNull(),
  title: text("title").notNull(),
  description: text("description"),
  contactId: text("contact_id"),
  dealId: text("deal_id"),
  userId: text("user_id"),
  assigneeId: text("assignee_id"),
  dueDate: integer("due_date", { mode: "timestamp" }),
  completedAt: integer("completed_at", { mode: "timestamp" }),
  metadata: text("metadata"),
  // JSON Record<string, unknown>
  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
});
var crmDealStageHistory = sqliteTable("crm_deal_stage_history", {
  id: text("id").primaryKey(),
  dealId: text("deal_id").notNull(),
  fromStageId: text("from_stage_id"),
  toStageId: text("to_stage_id").notNull(),
  changedBy: text("changed_by"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
});
var nurtureFlows = sqliteTable("nurture_flows", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  // JSON NurtureTrigger[] (array). Legacy rows may contain a single object —
  // parseFlow normalizes both shapes to an array.
  trigger: text("trigger").notNull().default("[]"),
  nodes: text("nodes").notNull().default("[]"),
  // JSON NurtureNode[]
  edges: text("edges").notNull().default("[]"),
  // JSON NurtureEdge[]
  stopConditions: text("stop_conditions").notNull().default("[]"),
  // JSON NurtureStopCondition[]
  onStop: text("on_stop").notNull().default("{}"),
  // JSON { promoteToChecklistId?: string }
  status: text("status", { enum: ["active", "archived"] }).notNull().default("active"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var nurtureApiTokens = sqliteTable("nurture_api_tokens", {
  id: text("id").primaryKey(),
  flowId: text("flow_id").notNull(),
  name: text("name").notNull(),
  tokenHash: text("token_hash").notNull(),
  prefix: text("prefix").notNull(),
  // First 12 chars of raw token, for display
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  lastUsedAt: integer("last_used_at", { mode: "timestamp" }),
  revokedAt: integer("revoked_at", { mode: "timestamp" })
});
var nurtureRuns = sqliteTable("nurture_runs", {
  id: text("id").primaryKey(),
  flowId: text("flow_id").notNull(),
  contactId: text("contact_id").notNull(),
  contactName: text("contact_name").notNull(),
  contactEmail: text("contact_email"),
  contactCompany: text("contact_company"),
  currentNodeId: text("current_node_id"),
  nodeState: text("node_state").notNull().default("{}"),
  // JSON Record<nodeId, NurtureNodeState>
  status: text("status", { enum: ["active", "stopped", "completed"] }).notNull().default("active"),
  stopReason: text("stop_reason"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var crmChecklists = sqliteTable("crm_checklists", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  items: text("items").notNull().default("[]"),
  // JSON ChecklistItemDef[]
  status: text("status", { enum: ["active", "archived"] }).notNull().default("active"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var crmChecklistRuns = sqliteTable("crm_checklist_runs", {
  id: text("id").primaryKey(),
  checklistId: text("checklist_id").notNull(),
  contactId: text("contact_id").notNull(),
  contactName: text("contact_name").notNull(),
  contactEmail: text("contact_email"),
  itemsSnapshot: text("items_snapshot").notNull().default("[]"),
  // JSON ChecklistItemDef[]
  itemStates: text("item_states").notNull().default("[]"),
  // JSON ChecklistItemState[]
  source: text("source", { enum: ["nurture_stop", "manual"] }).notNull(),
  sourceNurtureRunId: text("source_nurture_run_id"),
  status: text("status", { enum: ["open", "completed"] }).notNull().default("open"),
  completedAt: integer("completed_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var contactSignals = sqliteTable("contact_signals", {
  id: text("id").primaryKey(),
  contactId: text("contact_id").notNull(),
  type: text("type").notNull(),
  // CompletionCriterionType
  source: text("source").notNull(),
  externalId: text("external_id"),
  payload: text("payload").notNull().default("{}"),
  // JSON
  occurredAt: integer("occurred_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
});
var signalBindings = sqliteTable("signal_bindings", {
  id: text("id").primaryKey(),
  contactId: text("contact_id").notNull(),
  criterionType: text("criterion_type").notNull(),
  // CompletionCriterionType
  externalId: text("external_id").notNull(),
  consumerKind: text("consumer_kind", { enum: ["nurture_run", "checklist_item"] }).notNull(),
  nurtureRunId: text("nurture_run_id"),
  checklistRunId: text("checklist_run_id"),
  checklistItemId: text("checklist_item_id"),
  expiresAt: integer("expires_at", { mode: "timestamp" }),
  status: text("status", { enum: ["active", "resolved", "expired"] }).notNull().default("active"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var schemaVersion = sqliteTable("_schema_version", {
  id: text("id").primaryKey().default("version"),
  version: integer("version").notNull(),
  migratedAt: integer("migrated_at", { mode: "timestamp" }).notNull()
});
var auditLogs = sqliteTable("audit_logs", {
  id: text("id").primaryKey(),
  actorType: text("actor_type", { enum: ["user", "worker", "sdk", "system"] }).notNull(),
  actorId: text("actor_id"),
  actorEmail: text("actor_email"),
  action: text("action").notNull(),
  resourceType: text("resource_type").notNull(),
  resourceId: text("resource_id"),
  traceId: text("trace_id"),
  metadata: text("metadata"),
  // JSON Record<string, unknown>
  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
});
var experts = sqliteTable("experts", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  systemPrompt: text("system_prompt").notNull().default(""),
  model: text("model").notNull(),
  temperature: integer("temperature").notNull().default(70),
  // stored as int * 100
  toolsEnabled: text("tools_enabled", { mode: "json" }).$type().notNull().default(["search_kb", "flag_missing_knowledge"]),
  maxContextTokens: integer("max_context_tokens").notNull().default(8e3),
  fallbackBehavior: text("fallback_behavior", {
    enum: ["flag_gap", "best_effort", "refuse"]
  }).notNull().default("flag_gap"),
  variableRefs: text("variable_refs", { mode: "json" }).$type().notNull().default([]),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var kbEntries = sqliteTable("kb_entries", {
  id: text("id").primaryKey(),
  type: text("type", { enum: ["document", "qa", "procedure", "policy"] }).notNull().default("document"),
  title: text("title").notNull(),
  description: text("description"),
  body: text("body").notNull().default(""),
  // Text extracted from attached files (PDF/txt/md/csv…) by the kb.embed worker.
  // Concatenated, file-name-headed. Appended to the embedding input and returned
  // by search_kb so the Expert can actually read uploaded documents.
  extractedText: text("extracted_text"),
  createdBy: text("created_by"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var kbTags = sqliteTable("kb_tags", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  isSystem: integer("is_system", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
});
var kbEntryTags = sqliteTable(
  "kb_entry_tags",
  {
    entryId: text("entry_id").notNull().references(() => kbEntries.id, { onDelete: "cascade" }),
    tagId: text("tag_id").notNull().references(() => kbTags.id, { onDelete: "cascade" })
  },
  (t) => ({
    pk: primaryKey({ columns: [t.entryId, t.tagId] })
  })
);
var kbEntryFiles = sqliteTable(
  "kb_entry_files",
  {
    entryId: text("entry_id").notNull().references(() => kbEntries.id, { onDelete: "cascade" }),
    fileId: text("file_id").notNull().references(() => files.id, { onDelete: "cascade" })
  },
  (t) => ({
    pk: primaryKey({ columns: [t.entryId, t.fileId] })
  })
);
var kbEntryEmbeddings = sqliteTable("kb_entry_embeddings", {
  entryId: text("entry_id").primaryKey().references(() => kbEntries.id, { onDelete: "cascade" }),
  model: text("model").notNull(),
  vector: text("vector").notNull(),
  // base64-encoded float32 array
  dim: integer("dim").notNull(),
  bodyHash: text("body_hash").notNull(),
  generatedAt: integer("generated_at", { mode: "timestamp" }).notNull()
});
var embeds = sqliteTable("embeds", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  expertId: text("expert_id").notNull().references(() => experts.id, { onDelete: "cascade" }),
  mode: text("mode", { enum: ["anonymous", "email", "portal", "password"] }).notNull(),
  requirePassword: integer("require_password", { mode: "boolean" }).notNull().default(false),
  passwordHash: text("password_hash"),
  allowedDomains: text("allowed_domains", { mode: "json" }).$type().notNull().default([]),
  primaryColor: text("primary_color").notNull().default("#000000"),
  theme: text("theme", { enum: ["light", "dark", "auto"] }).notNull().default("auto"),
  avatarUrl: text("avatar_url"),
  welcomeMessage: text("welcome_message"),
  maxMessagesPerDay: integer("max_messages_per_day").notNull().default(1e3),
  maxMessagesPerVisitorPerHour: integer("max_messages_per_visitor_per_hour").notNull().default(30),
  enabled: integer("enabled", { mode: "boolean" }).notNull().default(true),
  createdBy: text("created_by"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var embedSettings = sqliteTable("embed_settings", {
  id: text("id").primaryKey().default("config"),
  monthlyCostBudgetCents: integer("monthly_cost_budget_cents").notNull().default(5e3),
  currentMonthSpendCents: integer("current_month_spend_cents").notNull().default(0),
  currentMonthResetAt: integer("current_month_reset_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var expertChatSessions = sqliteTable("expert_chat_sessions", {
  id: text("id").primaryKey(),
  expertId: text("expert_id").notNull().references(() => experts.id, { onDelete: "cascade" }),
  title: text("title"),
  startedBy: text("started_by"),
  source: text("source", { enum: ["portal", "embed", "api"] }).notNull().default("portal"),
  visitorEmail: text("visitor_email"),
  startedAt: integer("started_at", { mode: "timestamp" }).notNull(),
  lastMessageAt: integer("last_message_at", { mode: "timestamp" }).notNull(),
  isTest: integer("is_test", { mode: "boolean" }).notNull().default(false),
  messageCount: integer("message_count").notNull().default(0),
  embedId: text("embed_id").references(() => embeds.id, { onDelete: "set null" }),
  visitorId: text("visitor_id"),
  visitorContactId: text("visitor_contact_id").references(() => crmContacts.id, {
    onDelete: "set null"
  })
});
var expertChatMessages = sqliteTable("expert_chat_messages", {
  id: text("id").primaryKey(),
  sessionId: text("session_id").notNull().references(() => expertChatSessions.id, { onDelete: "cascade" }),
  role: text("role", { enum: ["user", "assistant", "tool", "system"] }).notNull(),
  content: text("content", { mode: "json" }).notNull(),
  tokensIn: integer("tokens_in").notNull().default(0),
  tokensOut: integer("tokens_out").notNull().default(0),
  costCents: integer("cost_cents").notNull().default(0),
  errorMessage: text("error_message"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
});
var kbGaps = sqliteTable("kb_gaps", {
  id: text("id").primaryKey(),
  expertId: text("expert_id").notNull().references(() => experts.id, { onDelete: "cascade" }),
  sessionId: text("session_id").references(() => expertChatSessions.id, { onDelete: "set null" }),
  messageId: text("message_id"),
  question: text("question").notNull(),
  source: text("source", { enum: ["auto", "user_reported"] }).notNull(),
  status: text("status", { enum: ["open", "answered", "dismissed"] }).notNull().default("open"),
  resolvedEntryId: text("resolved_entry_id").references(() => kbEntries.id, {
    onDelete: "set null"
  }),
  resolvedBy: text("resolved_by"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  resolvedAt: integer("resolved_at", { mode: "timestamp" })
});

// src/handler/db.ts
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
function getClientDb(url, authToken) {
  const isLocal = url.startsWith("file:");
  const client = createClient(
    isLocal ? { url } : { url, authToken }
  );
  return drizzle(client, { schema: schema_exports });
}

// src/handler/routes/content.ts
var CACHE_HEADERS = {
  "Cache-Control": "s-maxage=60, stale-while-revalidate=300"
};
var BLOG_FIELDS_WHITELIST = /* @__PURE__ */ new Set([
  "id",
  "slug",
  "urlPath",
  "title",
  "language",
  "status",
  "updatedAt",
  "createdAt",
  "publishedAt",
  "parentPostId",
  "heroImageUrl",
  "seoTitle",
  "seoDesc",
  "authorId"
]);
var DEFAULT_LIMIT = 20;
var MAX_LIMIT = 5e3;
function parseBlogFields(fieldsParam) {
  if (!fieldsParam) return void 0;
  const requested = fieldsParam.split(",").map((f) => f.trim()).filter(Boolean);
  const valid = requested.filter((f) => BLOG_FIELDS_WHITELIST.has(f));
  if (valid.length === 0) return void 0;
  const selection = {};
  for (const field of valid) {
    const col = blogPosts[field];
    if (col) selection[field] = col;
  }
  return Object.keys(selection).length > 0 ? selection : void 0;
}
function parseLimit(limitParam) {
  if (limitParam === null) return DEFAULT_LIMIT;
  const n = parseInt(limitParam, 10);
  if (isNaN(n) || n < 0) return DEFAULT_LIMIT;
  if (n === 0) return MAX_LIMIT;
  return Math.min(n, MAX_LIMIT);
}
function parseOffset(offsetParam) {
  if (offsetParam === null) return 0;
  const n = parseInt(offsetParam, 10);
  return isNaN(n) || n < 0 ? 0 : n;
}
async function handleContent(request, tursoUrl, tursoAuthToken) {
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get("type");
    const slug = url.searchParams.get("slug");
    const platform = url.searchParams.get("platform");
    const locale = url.searchParams.get("locale");
    const db = getClientDb(tursoUrl, tursoAuthToken);
    if (type === "blog") {
      const countOnly = url.searchParams.get("count") === "true";
      if (countOnly) {
        const conditions = [eq(blogPosts.status, "published")];
        if (locale) conditions.push(eq(blogPosts.language, locale));
        const result = await db.select({ count: drizzleCount() }).from(blogPosts).where(and(...conditions));
        return Response.json(
          { count: result[0]?.count ?? 0 },
          { headers: CACHE_HEADERS }
        );
      }
      if (slug) {
        const slugMatch = or(eq(blogPosts.slug, slug), eq(blogPosts.urlPath, slug));
        const conditions = [slugMatch];
        if (locale) conditions.push(eq(blogPosts.language, locale));
        const post = await db.select().from(blogPosts).where(and(...conditions)).limit(1);
        return Response.json(post[0] ?? null, { headers: CACHE_HEADERS });
      }
      const authorSlug = url.searchParams.get("authorSlug");
      if (authorSlug) {
        const author = await db.select().from(blogAuthors).where(eq(blogAuthors.slug, authorSlug)).limit(1);
        if (!author[0]) {
          return Response.json([], { headers: CACHE_HEADERS });
        }
        const language2 = locale ?? "en";
        const limit2 = parseLimit(url.searchParams.get("limit"));
        const offset2 = parseOffset(url.searchParams.get("offset"));
        const where2 = and(
          eq(blogPosts.status, "published"),
          eq(blogPosts.language, language2),
          eq(blogPosts.authorId, author[0].id)
        );
        const posts2 = await db.select().from(blogPosts).where(where2).orderBy(desc(blogPosts.createdAt)).limit(limit2).offset(offset2);
        return Response.json(posts2, { headers: CACHE_HEADERS });
      }
      const language = locale ?? "en";
      const limit = parseLimit(url.searchParams.get("limit"));
      const offset = parseOffset(url.searchParams.get("offset"));
      const fields = parseBlogFields(url.searchParams.get("fields"));
      const where = and(
        eq(blogPosts.status, "published"),
        eq(blogPosts.language, language)
      );
      const posts = fields ? await db.select(fields).from(blogPosts).where(where).orderBy(desc(blogPosts.createdAt)).limit(limit).offset(offset) : await db.select().from(blogPosts).where(where).orderBy(desc(blogPosts.createdAt)).limit(limit).offset(offset);
      return Response.json(posts, { headers: CACHE_HEADERS });
    }
    if (type === "blog-authors") {
      if (slug) {
        const author = await db.select().from(blogAuthors).where(eq(blogAuthors.slug, slug)).limit(1);
        return Response.json(author[0] ?? null, { headers: CACHE_HEADERS });
      }
      const authors = await db.select().from(blogAuthors).orderBy(desc(blogAuthors.createdAt));
      return Response.json(authors, { headers: CACHE_HEADERS });
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
  } catch (err) {
    const url = new URL(request.url);
    console.error(`[GrowthEngine] content route error (${url.search}):`, err);
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
  } catch (err) {
    console.error("[GrowthEngine] config route error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// src/handler/routes/forms.ts
import { eq as eq2 } from "drizzle-orm";

// ../types/src/audit.ts
async function writeAuditLog(db, params) {
  try {
    await db.insert(auditLogs).values({
      id: globalThis.crypto.randomUUID(),
      actorType: params.actor.type,
      ...params.actor.id != null && { actorId: params.actor.id },
      ...params.actor.email != null && { actorEmail: params.actor.email },
      action: params.action,
      resourceType: params.resourceType,
      ...params.resourceId != null && { resourceId: params.resourceId },
      ...params.traceId != null && { traceId: params.traceId },
      ...params.metadata != null && { metadata: JSON.stringify(params.metadata) },
      createdAt: /* @__PURE__ */ new Date()
    });
  } catch {
  }
}

// ../types/src/index.ts
var SDK_VERSION = "0.1.28";

// src/handler/routes/forms.ts
async function tryCreateCrmContact(db, submissionId, data) {
  try {
    const email = data.email ?? data.Email ?? data.e_mail;
    const firstName = data.firstName ?? data.first_name ?? data.name ?? data.Name;
    const lastName = data.lastName ?? data.last_name;
    const phone = data.phone ?? data.Phone ?? data.telephone;
    const company = data.company ?? data.Company ?? data.organization;
    if (!email && !firstName) return;
    if (email) {
      const existing = await db.select({ id: crmContacts.id }).from(crmContacts).where(eq2(crmContacts.email, String(email))).limit(1);
      if (existing.length > 0) return;
    }
    const parts = firstName ? String(firstName).split(" ") : ["Unknown"];
    const first = parts[0] ?? "Unknown";
    const last = lastName ? String(lastName) : parts.slice(1).join(" ") || "Unknown";
    await db.insert(crmContacts).values({
      id: crypto.randomUUID(),
      firstName: first,
      lastName: last,
      email: email ? String(email) : null,
      phone: phone ? String(phone) : null,
      company: company ? String(company) : null,
      source: "form",
      sourceId: submissionId,
      status: "active",
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    });
  } catch (err) {
    console.error("[GrowthEngine] auto-create CRM contact failed:", err);
  }
}
async function tryNotifyEmails(brainApiUrl, brainApiKey, formName, formSlug, fields, data, notifyEmails, senderEmail, customMessage, useEmailTemplate, from) {
  const url = `${brainApiUrl}/api/sdk/forms/notify`;
  try {
    console.log("[GrowthEngine] notifying Brain API | url:", url, "| form:", formSlug, "| recipients:", notifyEmails.length);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": brainApiKey
      },
      body: JSON.stringify({
        formName,
        formSlug,
        fields: fields.map((f) => ({ label: f.label, name: f.name })),
        data,
        notifyEmails,
        submittedAt: (/* @__PURE__ */ new Date()).toISOString(),
        ...senderEmail ? { senderEmail } : {},
        ...from ? { from } : {},
        ...customMessage ? { customMessage } : {},
        ...useEmailTemplate ? { useEmailTemplate } : {}
      })
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "(no body)");
      console.error("[GrowthEngine] Brain notify returned error | status:", res.status, "| body:", body);
    } else {
      console.log("[GrowthEngine] Brain notify success | status:", res.status);
    }
  } catch (err) {
    console.error("[GrowthEngine] form notify webhook failed:", err);
  }
}
async function trySendConfirmationEmail(brainApiUrl, brainApiKey, senderEmail, formName, subject, message, data, replyTo, useEmailTemplate, from) {
  const url = `${brainApiUrl}/api/sdk/forms/confirm`;
  try {
    console.log("[GrowthEngine] sending confirmation via Brain API | url:", url, "| to:", senderEmail, "| form:", formName);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": brainApiKey
      },
      body: JSON.stringify({
        to: senderEmail,
        formName,
        subject,
        message,
        ...data ? { data } : {},
        ...replyTo ? { replyTo } : {},
        ...from ? { from } : {},
        ...useEmailTemplate ? { useEmailTemplate } : {}
      })
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "(no body)");
      console.error("[GrowthEngine] Brain confirm returned error | status:", res.status, "| body:", body);
    } else {
      console.log("[GrowthEngine] Brain confirm success | status:", res.status);
    }
  } catch (err) {
    console.error("[GrowthEngine] form confirmation webhook failed:", err);
  }
}
async function tryTriggerPipelines(brainApiUrl, brainApiKey, formId, submissionData, db) {
  try {
    const email = submissionData.email ?? submissionData.Email ?? submissionData.e_mail;
    if (!email) return;
    const rows = await db.select({ id: crmContacts.id, firstName: crmContacts.firstName, lastName: crmContacts.lastName }).from(crmContacts).where(eq2(crmContacts.email, String(email))).limit(1);
    const contact = rows[0];
    if (!contact) return;
    const contactName = [contact.firstName, contact.lastName].filter(Boolean).join(" ") || "Unknown";
    const company = submissionData.company ?? submissionData.Company ?? submissionData.organization;
    const url = `${brainApiUrl}/api/sdk/forms/trigger-pipeline`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": brainApiKey
      },
      body: JSON.stringify({
        formId,
        submissionData,
        contactId: contact.id,
        contactName,
        contactEmail: email,
        ...company ? { contactCompany: company } : {}
      })
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "(no body)");
      console.error("[GrowthEngine] pipeline trigger returned error | status:", res.status, "| body:", body);
    } else {
      console.log("[GrowthEngine] pipeline trigger success | formId:", formId);
    }
  } catch (err) {
    console.error("[GrowthEngine] pipeline trigger failed:", err);
  }
}
async function handleForms(request, tursoUrl, tursoAuthToken, brainApiUrl, brainApiKey) {
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
      console.log("[GrowthEngine] form submission received | slug:", slug, "| formId:", form.id);
      const id = crypto.randomUUID();
      await db.insert(formSubmissions).values({
        id,
        formId: form.id,
        data: JSON.stringify(data),
        createdAt: /* @__PURE__ */ new Date()
      });
      console.log("[GrowthEngine] form submission stored | id:", id, "| slug:", slug);
      await tryCreateCrmContact(db, id, data);
      const settings = form.settings ? JSON.parse(form.settings) : null;
      const notifyEmails = settings?.notifyEmails;
      if (notifyEmails && notifyEmails.length > 0) {
        console.log("[GrowthEngine] form has notifyEmails | count:", notifyEmails.length, "| emails:", notifyEmails.join(","));
        const replyToField = settings?.replyToFieldName ? fields.find((f) => f.name === settings.replyToFieldName && f.type === "email") : fields.find((f) => f.type === "email");
        const senderEmailForReply = replyToField ? String(data[replyToField.name] ?? "") : "";
        await tryNotifyEmails(brainApiUrl, brainApiKey, form.name, slug, fields, data, notifyEmails, senderEmailForReply || void 0, settings?.notificationEmailMessage, settings?.useEmailTemplateNotification ?? settings?.useEmailTemplate, settings?.notificationFromEmail);
      }
      if (settings?.sendConfirmationEmail) {
        const emailField = fields.find((f) => f.type === "email");
        const senderEmail = emailField ? String(data[emailField.name] ?? "") : "";
        if (senderEmail) {
          await trySendConfirmationEmail(
            brainApiUrl,
            brainApiKey,
            senderEmail,
            form.name,
            settings.confirmationEmailSubject,
            settings.confirmationEmailMessage,
            data,
            settings.replyToEmail,
            settings.useEmailTemplateConfirmation ?? settings.useEmailTemplate,
            settings.confirmationFromEmail
          );
        }
      }
      if ((!notifyEmails || notifyEmails.length === 0) && !settings?.sendConfirmationEmail) {
        console.log("[GrowthEngine] no email notifications configured | slug:", slug);
      }
      await writeAuditLog(db, {
        actor: { type: "sdk", id: null, email: null },
        action: "form.submit",
        resourceType: "form_submission",
        resourceId: id,
        metadata: { formId: form.id, formSlug: slug }
      });
      await tryTriggerPipelines(brainApiUrl, brainApiKey, form.id, data, db);
      return Response.json({ ok: true, id });
    }
    return Response.json({ error: "Invalid action" }, { status: 400 });
  } catch (err) {
    console.error("[GrowthEngine] forms route error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// src/handler/routes/jobs.ts
function isValidUrl(str) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}
async function handleJobs(request, brainApiKey) {
  try {
    const brainBase = globalThis.process?.env?.BRAIN_API_URL ?? "https://brain.yourapp.com";
    if (!isValidUrl(brainBase)) {
      return Response.json({ error: "BRAIN_API_URL is not a valid URL" });
    }
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
  } catch (err) {
    console.error("[GrowthEngine] jobs route error:", err);
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
  } catch (err) {
    console.error("[GrowthEngine] analytics route error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// src/handler/routes/crm.ts
import { eq as eq3 } from "drizzle-orm";
async function handleCrm(request, tursoUrl, tursoAuthToken) {
  try {
    const url = new URL(request.url);
    const action = url.searchParams.get("action");
    const db = getClientDb(tursoUrl, tursoAuthToken);
    if (request.method === "POST" && action === "push-lead") {
      const body = await request.json();
      if (!body.firstName?.trim() && !body.email?.trim()) {
        return Response.json(
          { error: "At least firstName or email is required" },
          { status: 400 }
        );
      }
      if (body.email) {
        const existing = await db.select({ id: crmContacts.id }).from(crmContacts).where(eq3(crmContacts.email, body.email.trim())).limit(1);
        if (existing.length > 0) {
          return Response.json({ ok: true, contactId: existing[0].id, existing: true });
        }
      }
      const id = crypto.randomUUID();
      await db.insert(crmContacts).values({
        id,
        firstName: body.firstName?.trim() ?? "Unknown",
        lastName: body.lastName?.trim() ?? "",
        email: body.email?.trim() ?? null,
        phone: body.phone?.trim() ?? null,
        company: body.company?.trim() ?? null,
        source: "sdk",
        status: "active",
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date()
      });
      void writeAuditLog(db, {
        actor: { type: "sdk", id: null, email: null },
        action: "crm.contact.sdk_push",
        resourceType: "crm_contact",
        resourceId: id,
        metadata: { email: body.email?.trim() ?? null, company: body.company?.trim() ?? null }
      });
      return Response.json({ ok: true, contactId: id });
    }
    return Response.json({ error: "Invalid action" }, { status: 400 });
  } catch (err) {
    console.error("[GrowthEngine] crm route error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// src/handler/index.ts
function isValidUrl2(str) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}
function resolveRoute(pathname) {
  const match = pathname.match(/\/api\/rs\/(.+)/);
  if (!match?.[1]) return null;
  return match[1];
}
function createDisabledHandler() {
  async function handleRequest(request) {
    const url = new URL(request.url);
    const route = resolveRoute(url.pathname);
    if (!route) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
    if (route === "content") {
      const type = url.searchParams.get("type");
      if (type === "blog-authors") {
        const slug2 = url.searchParams.get("slug");
        if (slug2) return Response.json(null);
        return Response.json([]);
      }
      const slug = url.searchParams.get("slug");
      const countOnly = url.searchParams.get("count") === "true";
      if (countOnly) return Response.json({ count: 0 });
      if (slug) return Response.json(null);
      return Response.json([]);
    }
    if (route === "config") {
      return Response.json(null);
    }
    if (route.startsWith("forms")) {
      const action = url.searchParams.get("action");
      if (action === "submit") return Response.json({ ok: false, error: "SDK not configured" });
      if (action === "get") return Response.json(null);
      return Response.json([]);
    }
    if (route.startsWith("jobs")) {
      return Response.json({ error: "SDK not configured" });
    }
    if (route === "analytics") {
      return Response.json({ success: true });
    }
    if (route.startsWith("crm")) {
      return Response.json({ ok: false, error: "SDK not configured" });
    }
    if (route === "sdk-status") {
      return Response.json({ sdkVersion: SDK_VERSION, disabled: true });
    }
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  return { GET: handleRequest, POST: handleRequest };
}
function GrowthEngineHandler(options) {
  const { brainApiUrl, brainApiKey, tursoUrl, tursoAuthToken } = options;
  const missing = [];
  if (!brainApiUrl?.trim()) missing.push("BRAIN_API_URL");
  if (!brainApiKey?.trim()) missing.push("BRAIN_API_KEY");
  if (!tursoUrl?.trim()) missing.push("TURSO_DATABASE_URL");
  if (!tursoAuthToken?.trim()) missing.push("TURSO_AUTH_TOKEN");
  if (missing.length > 0) {
    console.warn(
      `[GrowthEngine] SDK disabled \u2014 missing env vars: ${missing.join(", ")}. SDK features will return empty data.`
    );
    return createDisabledHandler();
  }
  const apiUrl = brainApiUrl;
  const apiKey = brainApiKey;
  const dbUrl = tursoUrl;
  const dbToken = tursoAuthToken;
  async function handleRequest(request) {
    const url = new URL(request.url);
    const route = resolveRoute(url.pathname);
    if (!route) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
    if (route === "content") {
      return handleContent(request, dbUrl, dbToken);
    }
    if (route === "config") {
      return handleConfig(request, dbUrl, dbToken);
    }
    if (route.startsWith("jobs")) {
      return handleJobs(request, apiKey);
    }
    if (route === "analytics") {
      return handleAnalytics(request, dbUrl, dbToken);
    }
    if (route.startsWith("forms")) {
      return handleForms(request, dbUrl, dbToken, apiUrl, apiKey);
    }
    if (route.startsWith("crm")) {
      return handleCrm(request, dbUrl, dbToken);
    }
    if (route === "sdk-status") {
      if (!isValidUrl2(apiUrl)) {
        return Response.json({
          sdkVersion: SDK_VERSION,
          error: "BRAIN_API_URL is not a valid URL"
        });
      }
      try {
        const res = await fetch(`${apiUrl}/api/sdk-versions`);
        const manifest = await res.json();
        return Response.json({ sdkVersion: SDK_VERSION, manifest }, { status: res.status });
      } catch (err) {
        console.error("[GrowthEngine] sdk-status fetch error:", err);
        return Response.json({
          sdkVersion: SDK_VERSION,
          error: "Unable to reach Brain API"
        });
      }
    }
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  return {
    GET: handleRequest,
    POST: handleRequest
  };
}

// src/queries/content.ts
import { eq as eq4, desc as desc2, and as and2, or as or2, count as drizzleCount2 } from "drizzle-orm";
var DEFAULT_LIMIT2 = 20;
var MAX_LIMIT2 = 5e3;
function resolveLimit(limit) {
  if (limit === void 0) return DEFAULT_LIMIT2;
  if (limit <= 0) return MAX_LIMIT2;
  return Math.min(limit, MAX_LIMIT2);
}
async function getBlogPosts(db, opts) {
  const locale = opts?.locale ?? "en";
  const limit = resolveLimit(opts?.limit);
  const offset = opts?.offset ?? 0;
  const rows = await db.select().from(blogPosts).where(and2(
    eq4(blogPosts.status, "published"),
    eq4(blogPosts.language, locale)
  )).orderBy(desc2(blogPosts.createdAt)).limit(limit).offset(offset);
  return rows;
}
async function getBlogPost(db, slug, locale) {
  const slugMatch = or2(eq4(blogPosts.slug, slug), eq4(blogPosts.urlPath, slug));
  const conditions = [slugMatch];
  if (locale) conditions.push(eq4(blogPosts.language, locale));
  const rows = await db.select().from(blogPosts).where(and2(...conditions)).limit(1);
  return rows[0] ?? null;
}
async function getBlogPostCount(db, locale) {
  const conditions = [eq4(blogPosts.status, "published")];
  if (locale) conditions.push(eq4(blogPosts.language, locale));
  const result = await db.select({ count: drizzleCount2() }).from(blogPosts).where(and2(...conditions));
  return result[0]?.count ?? 0;
}
async function getBlogAuthors(db) {
  const rows = await db.select().from(blogAuthors).orderBy(desc2(blogAuthors.createdAt));
  return rows;
}
async function getBlogAuthor(db, slug) {
  const rows = await db.select().from(blogAuthors).where(eq4(blogAuthors.slug, slug)).limit(1);
  return rows[0] ?? null;
}
async function getBlogAuthorById(db, id) {
  const rows = await db.select().from(blogAuthors).where(eq4(blogAuthors.id, id)).limit(1);
  return rows[0] ?? null;
}
async function getAuthorPosts(db, authorSlug, opts) {
  const author = await db.select().from(blogAuthors).where(eq4(blogAuthors.slug, authorSlug)).limit(1);
  if (!author[0]) return [];
  const locale = opts?.locale ?? "en";
  const limit = resolveLimit(opts?.limit);
  const offset = opts?.offset ?? 0;
  const rows = await db.select().from(blogPosts).where(and2(
    eq4(blogPosts.status, "published"),
    eq4(blogPosts.language, locale),
    eq4(blogPosts.authorId, author[0].id)
  )).orderBy(desc2(blogPosts.createdAt)).limit(limit).offset(offset);
  return rows;
}

// src/queries/forms.ts
import { eq as eq5 } from "drizzle-orm";
function parseFormRow(row) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    fields: typeof row.fields === "string" ? JSON.parse(row.fields) : row.fields,
    settings: row.settings ? typeof row.settings === "string" ? JSON.parse(row.settings) : row.settings : null,
    status: row.status,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt
  };
}
async function getActiveForms(db) {
  const rows = await db.select().from(forms).where(eq5(forms.status, "active"));
  return rows.map(parseFormRow);
}
async function getFormBySlug(db, slug) {
  const rows = await db.select().from(forms).where(eq5(forms.slug, slug)).limit(1);
  const row = rows[0];
  if (!row) return null;
  return parseFormRow(row);
}

// src/queries/config.ts
async function getBusinessConfig(db) {
  const rows = await db.select().from(businessConfig).limit(1);
  const config = rows[0];
  if (!config) return null;
  return {
    ...config,
    hours: config.hours ? JSON.parse(config.hours) : null,
    contact: config.contact ? JSON.parse(config.contact) : null,
    address: config.address ? JSON.parse(config.address) : null,
    seo: config.seo ? JSON.parse(config.seo) : null
  };
}
export {
  GrowthEngineHandler,
  getActiveForms,
  getAuthorPosts,
  getBlogAuthor,
  getBlogAuthorById,
  getBlogAuthors,
  getBlogPost,
  getBlogPostCount,
  getBlogPosts,
  getBusinessConfig,
  getClientDb,
  getFormBySlug
};
//# sourceMappingURL=index.js.map