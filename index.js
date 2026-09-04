var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/handler/routes/content.ts
import { eq as eq3, desc as desc3, and as and3, or, count as drizzleCount2 } from "drizzle-orm";

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
  crmDealSuggestions: () => crmDealSuggestions,
  crmDeals: () => crmDeals,
  crmOrganizations: () => crmOrganizations,
  crmPipelineStages: () => crmPipelineStages,
  crmPipelines: () => crmPipelines,
  emailSuppressions: () => emailSuppressions,
  embedSettings: () => embedSettings,
  embeds: () => embeds,
  expertChatMessages: () => expertChatMessages,
  expertChatSessions: () => expertChatSessions,
  experts: () => experts,
  files: () => files,
  formSubmissions: () => formSubmissions,
  forms: () => forms,
  kbEntries: () => kbEntries,
  kbEntryChunks: () => kbEntryChunks,
  kbEntryEmbeddings: () => kbEntryEmbeddings,
  kbEntryFiles: () => kbEntryFiles,
  kbEntryTags: () => kbEntryTags,
  kbGaps: () => kbGaps,
  kbSources: () => kbSources,
  kbTags: () => kbTags,
  landingPages: () => landingPages,
  newsletterIssues: () => newsletterIssues,
  newsletterSends: () => newsletterSends,
  newsletterSubscribers: () => newsletterSubscribers,
  nurtureApiTokens: () => nurtureApiTokens,
  nurtureFlows: () => nurtureFlows,
  nurtureRuns: () => nurtureRuns,
  operatorChannelMessages: () => operatorChannelMessages,
  operatorChannelThreads: () => operatorChannelThreads,
  operatorMessages: () => operatorMessages,
  operatorPermissions: () => operatorPermissions,
  operatorSessions: () => operatorSessions,
  schemaVersion: () => schemaVersion,
  signalBindings: () => signalBindings,
  socialComments: () => socialComments,
  socialIdeas: () => socialIdeas,
  socialPersonas: () => socialPersonas,
  socialPosts: () => socialPosts,
  updateItems: () => updateItems,
  updateLists: () => updateLists,
  variables: () => variables
});
import { index, integer, primaryKey, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
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
  // Label of the business location this post is localized for (e.g. "San Diego
  // Office"). Null for global/non-local posts. Set by the blog-writing agent.
  locationLabel: text("location_label"),
  publishedAt: integer("published_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var landingPages = sqliteTable("landing_pages", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  // The language this page is written in, same shape as `blogPosts.language`.
  // Without it a translated money page was invisible to the per-language payoff
  // breakdown and its visits went missing from every language row, so the table
  // could not reconcile with the site totals. Guessing it from the URL prefix
  // was rejected: a guessed denominator silently moves the visits-per-page
  // figure the keep-or-stop translation decision rests on.
  language: text("language").notNull().default("en"),
  // The service + city this page targets (city null for non-local pages).
  service: text("service"),
  city: text("city"),
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
  // Standing guidance for AI-drafted comment replies (tone, escalation rules).
  replyGuidance: text("reply_guidance"),
  avatarUrl: text("avatar_url"),
  enabled: integer("enabled", { mode: "boolean" }).notNull().default(true),
  // Default number of post variations to generate per platform for this persona.
  // Overridable per-run (one-off) and per-schedule. Defaults to 3.
  variationCount: integer("variation_count").notNull().default(3),
  // JSON: PersonaCarouselConfig — carousel design + branding preferences.
  // Null = library defaults.
  carouselConfig: text("carousel_config"),
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
  // Why the post shipped without a visual asset (generate_social_asset failed
  // during the run). NULL = nothing recorded. Cleared when an asset is applied.
  assetFailure: text("asset_failure"),
  workflowRunId: text("workflow_run_id"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var socialComments = sqliteTable("social_comments", {
  id: text("id").primaryKey(),
  personaId: text("persona_id"),
  platform: text("platform", { enum: ["linkedin", "x", "instagram", "facebook"] }).notNull(),
  authorName: text("author_name"),
  commentText: text("comment_text").notNull(),
  postContext: text("post_context"),
  // One-off guidance for this reply; layers on the persona's reply_guidance.
  note: text("note"),
  sourceUrl: text("source_url"),
  draftReply: text("draft_reply"),
  status: text("status", { enum: ["new", "drafted", "replied", "archived"] }).notNull().default("new"),
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
  // Human caption. Load-bearing for image files: the blog agent picks reference
  // photos by reading these, and "IMG_4821.jpg" tells it nothing. See
  // packages/domain/src/brand-images.ts.
  description: text("description"),
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
  source: text("source", { enum: ["form", "manual", "import", "sdk", "lead_finder", "embed", "api"] }).notNull().default("manual"),
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
var crmPipelines = sqliteTable("crm_pipelines", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  order: integer("order").notNull().default(0),
  isDefault: integer("is_default", { mode: "boolean" }).notNull().default(false),
  status: text("status", { enum: ["active", "archived"] }).notNull().default("active"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var crmPipelineStages = sqliteTable("crm_pipeline_stages", {
  id: text("id").primaryKey(),
  pipelineId: text("pipeline_id"),
  name: text("name").notNull(),
  order: integer("order").notNull(),
  color: text("color"),
  isDefault: integer("is_default", { mode: "boolean" }).notNull().default(false),
  isClosed: integer("is_closed", { mode: "boolean" }).notNull().default(false),
  rottingThresholdDays: integer("rotting_threshold_days"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
});
var crmDeals = sqliteTable("crm_deals", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  contactId: text("contact_id").notNull(),
  stageId: text("stage_id").notNull(),
  pipelineId: text("pipeline_id"),
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
  type: text("type", { enum: ["call", "email", "email_received", "meeting", "note", "task", "form_submission", "pipeline_change", "status_change", "deal_created", "website_visit", "embed_chat"] }).notNull(),
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
var crmDealSuggestions = sqliteTable(
  "crm_deal_suggestions",
  {
    id: text("id").primaryKey(),
    contactId: text("contact_id").notNull(),
    sourceType: text("source_type", {
      enum: ["form", "lead_finder", "checklist_promote"]
    }).notNull(),
    sourceId: text("source_id"),
    suggestedTitle: text("suggested_title").notNull(),
    suggestedValue: integer("suggested_value"),
    // cents
    status: text("status", { enum: ["pending", "approved", "dismissed"] }).notNull().default("pending"),
    dismissReason: text("dismiss_reason"),
    createdDealId: text("created_deal_id"),
    payloadSnapshot: text("payload_snapshot"),
    // JSON Record<string, unknown>
    reviewedBy: text("reviewed_by"),
    reviewedAt: integer("reviewed_at", { mode: "timestamp" }),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
  },
  (t) => ({
    statusIdx: index("idx_deal_suggestions_status").on(t.status),
    contactIdx: index("idx_deal_suggestions_contact").on(t.contactId)
  })
);
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
  senderRef: text("sender_ref"),
  // JSON SenderRef — who sends this flow's emails (null → tenant default)
  deliveryMode: text("delivery_mode", { enum: ["simulation", "live"] }).notNull().default("live"),
  // 'paused' is type-level only (SQLite has no CHECK constraint here, so no
  // migration was needed). The DB default stays 'active' for legacy rows;
  // createNurtureFlow writes 'paused' explicitly for new flows.
  status: text("status", { enum: ["active", "paused", "archived"] }).notNull().default("active"),
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
  // Run-scoped key→value blob populated by `workflow` nodes (outputKey → workflow output).
  // Referenced by downstream emails via {{workflow.<outputKey>.<field>}} merge expressions
  // and surfaced to personalizeEmailWithAi as structured context.
  runContext: text("run_context").notNull().default("{}"),
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
var kbSources = sqliteTable("kb_sources", {
  id: text("id").primaryKey(),
  // 'blog' reads this tenant's blog_posts directly — no crawl, never stale.
  // 'url'  discovers + scrapes pages under a hub URL via Firecrawl.
  type: text("type", { enum: ["blog", "url"] }).notNull(),
  label: text("label").notNull(),
  url: text("url"),
  // 'hub' follows same-origin links beneath `url`; 'single' scrapes only `url`.
  crawlMode: text("crawl_mode", { enum: ["hub", "single"] }).notNull().default("hub"),
  maxPages: integer("max_pages").notNull().default(50),
  enabled: integer("enabled", { mode: "boolean" }).notNull().default(true),
  status: text("status", { enum: ["idle", "syncing", "error"] }).notNull().default("idle"),
  lastSyncedAt: integer("last_synced_at", { mode: "timestamp" }),
  lastError: text("last_error"),
  entryCount: integer("entry_count").notNull().default(0),
  createdBy: text("created_by"),
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
  // Set when the entry was produced by a kb_source sync rather than typed by a
  // human. Such entries are read-only in the editor and are replaced wholesale
  // on the next sync.
  sourceId: text("source_id").references(() => kbSources.id, { onDelete: "cascade" }),
  // Stable identity WITHIN the source (blog post id, or the scraped page URL) so
  // a re-sync updates the same row instead of duplicating it.
  sourceRef: text("source_ref"),
  // Where a human can read the original — surfaced so the Expert can cite it.
  sourceUrl: text("source_url"),
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
var kbEntryChunks = sqliteTable("kb_entry_chunks", {
  id: text("id").primaryKey(),
  entryId: text("entry_id").notNull().references(() => kbEntries.id, { onDelete: "cascade" }),
  chunkIndex: integer("chunk_index").notNull(),
  text: text("text").notNull(),
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
  position: text("position", {
    enum: [
      "bottom-right",
      "bottom-left",
      "top-right",
      "top-left",
      "bottom-center",
      "top-center"
    ]
  }).notNull().default("bottom-right"),
  headerTitle: text("header_title"),
  autoOpenDelaySeconds: integer("auto_open_delay_seconds"),
  welcomeMessage: text("welcome_message"),
  suggestedQuestions: text("suggested_questions", { mode: "json" }).$type().notNull().default([]),
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
var operatorSessions = sqliteTable("operator_sessions", {
  id: text("id").primaryKey(),
  title: text("title"),
  startedBy: text("started_by").notNull(),
  // lowercased user email
  startedAt: integer("started_at", { mode: "timestamp" }).notNull(),
  lastMessageAt: integer("last_message_at", { mode: "timestamp" }).notNull(),
  messageCount: integer("message_count").notNull().default(0)
});
var operatorMessages = sqliteTable("operator_messages", {
  id: text("id").primaryKey(),
  sessionId: text("session_id").notNull().references(() => operatorSessions.id, { onDelete: "cascade" }),
  role: text("role", { enum: ["user", "assistant", "tool"] }).notNull(),
  content: text("content", { mode: "json" }).notNull(),
  tokensIn: integer("tokens_in").notNull().default(0),
  tokensOut: integer("tokens_out").notNull().default(0),
  costCents: integer("cost_cents").notNull().default(0),
  errorMessage: text("error_message"),
  confirmedAt: integer("confirmed_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
});
var operatorPermissions = sqliteTable("operator_permissions", {
  id: text("id").primaryKey(),
  userEmail: text("user_email").notNull().unique(),
  // lowercased; unique per tenant DB
  enabled: integer("enabled", { mode: "boolean" }).notNull().default(false),
  // Record<DomainKey, 'none' | 'read' | 'write' | 'destructive'>
  domains: text("domains", { mode: "json" }).$type().notNull(),
  // Record<toolName, 'allow' | 'deny'>
  toolOverrides: text("tool_overrides", { mode: "json" }).$type().notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  updatedBy: text("updated_by")
});
var operatorChannelThreads = sqliteTable(
  "operator_channel_threads",
  {
    id: text("id").primaryKey(),
    provider: text("provider").notNull(),
    bindingId: text("binding_id").notNull(),
    integrationInstanceId: text("integration_instance_id").notNull(),
    externalThreadId: text("external_thread_id").notNull(),
    externalConversationId: text("external_conversation_id"),
    operatorSessionId: text("operator_session_id").notNull().references(() => operatorSessions.id, { onDelete: "cascade" }),
    startedByExternalUserId: text("started_by_external_user_id"),
    lastMessageAt: integer("last_message_at", { mode: "timestamp" }).notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull()
  },
  (t) => [uniqueIndex("operator_channel_threads_provider_binding_thread_unique").on(t.provider, t.bindingId, t.externalThreadId)]
);
var operatorChannelMessages = sqliteTable("operator_channel_messages", {
  id: text("id").primaryKey(),
  threadId: text("thread_id").notNull().references(() => operatorChannelThreads.id, { onDelete: "cascade" }),
  direction: text("direction", { enum: ["inbound", "outbound"] }).notNull(),
  providerMessageId: text("provider_message_id"),
  operatorMessageId: text("operator_message_id").references(() => operatorMessages.id, {
    onDelete: "set null"
  }),
  externalUserId: text("external_user_id"),
  externalUserLabel: text("external_user_label"),
  text: text("text").notNull(),
  status: text("status", {
    enum: ["received", "ignored", "queued", "sent", "drafted", "failed"]
  }).notNull(),
  reason: text("reason"),
  rawSummary: text("raw_summary", { mode: "json" }).$type(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull()
});
var newsletterSubscribers = sqliteTable(
  "newsletter_subscribers",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull(),
    // stored lowercased
    name: text("name"),
    status: text("status", { enum: ["subscribed", "unsubscribed"] }).notNull().default("subscribed"),
    source: text("source", { enum: ["sdk", "manual", "import"] }).notNull().default("sdk"),
    unsubscribedAt: integer("unsubscribed_at", { mode: "timestamp" }),
    // Which issue's email triggered the unsubscribe. Plain text (no FK) so
    // subscriber rows survive issue deletion.
    unsubscribeIssueId: text("unsubscribe_issue_id"),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
  },
  (t) => [uniqueIndex("newsletter_subscribers_email_unique").on(t.email)]
);
var newsletterIssues = sqliteTable("newsletter_issues", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  subject: text("subject").notNull(),
  previewText: text("preview_text"),
  content: text("content").notNull(),
  // markdown source
  status: text("status", { enum: ["draft", "scheduled", "sending", "sent", "failed"] }).notNull().default("draft"),
  senderRef: text("sender_ref"),
  // JSON SenderRef
  scheduledAt: integer("scheduled_at", { mode: "timestamp" }),
  scheduledJobId: text("scheduled_job_id"),
  sentAt: integer("sent_at", { mode: "timestamp" }),
  recipientCount: integer("recipient_count").notNull().default(0),
  sentCount: integer("sent_count").notNull().default(0),
  failedCount: integer("failed_count").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var newsletterSends = sqliteTable(
  "newsletter_sends",
  {
    id: text("id").primaryKey(),
    issueId: text("issue_id").notNull().references(() => newsletterIssues.id, { onDelete: "cascade" }),
    subscriberId: text("subscriber_id").notNull().references(() => newsletterSubscribers.id, { onDelete: "cascade" }),
    email: text("email").notNull(),
    // snapshot at send time
    status: text("status", { enum: ["pending", "sent", "failed"] }).notNull().default("pending"),
    messageId: text("message_id"),
    error: text("error"),
    openedAt: integer("opened_at", { mode: "timestamp" }),
    openCount: integer("open_count").notNull().default(0),
    clickedAt: integer("clicked_at", { mode: "timestamp" }),
    clickCount: integer("click_count").notNull().default(0),
    sentAt: integer("sent_at", { mode: "timestamp" }),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull()
  },
  (t) => [uniqueIndex("newsletter_sends_issue_subscriber_unique").on(t.issueId, t.subscriberId)]
);
var updateLists = sqliteTable(
  "update_lists",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    description: text("description"),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
  },
  (t) => [uniqueIndex("update_lists_slug_unique").on(t.slug)]
);
var updateItems = sqliteTable("update_items", {
  id: text("id").primaryKey(),
  listId: text("list_id").notNull().references(() => updateLists.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  body: text("body").notNull().default(""),
  // markdown source
  imageUrl: text("image_url"),
  eventDate: integer("event_date", { mode: "timestamp" }),
  status: text("status", { enum: ["draft", "published"] }).notNull().default("draft"),
  publishedAt: integer("published_at", { mode: "timestamp" }),
  // Manual ordering override; null falls back to the natural date order.
  sortOrder: integer("sort_order"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull()
});
var emailSuppressions = sqliteTable(
  "email_suppressions",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull(),
    // stored lowercased
    reason: text("reason", { enum: ["unsubscribe", "bounce", "complaint", "manual"] }).notNull().default("unsubscribe"),
    // Which surface produced it, e.g. 'nurture' | 'newsletter' | 'portal'.
    source: text("source"),
    contactId: text("contact_id"),
    flowId: text("flow_id"),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull()
  },
  (t) => [uniqueIndex("email_suppressions_email_unique").on(t.email)]
);

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

// src/queries/newsletter.ts
import { eq, desc, and, count as drizzleCount } from "drizzle-orm";
var DEFAULT_LIMIT = 20;
var MAX_LIMIT = 5e3;
function resolveLimit(limit) {
  if (limit === void 0) return DEFAULT_LIMIT;
  if (limit <= 0) return MAX_LIMIT;
  return Math.min(limit, MAX_LIMIT);
}
function toPublicNewsletterIssue(row) {
  return {
    id: row.id,
    slug: row.slug,
    subject: row.subject,
    previewText: row.previewText,
    content: row.content,
    sentAt: row.sentAt
  };
}
async function getNewsletterIssues(db, opts) {
  const limit = resolveLimit(opts?.limit);
  const offset = opts?.offset ?? 0;
  const rows = await db.select().from(newsletterIssues).where(eq(newsletterIssues.status, "sent")).orderBy(desc(newsletterIssues.sentAt)).limit(limit).offset(offset);
  return rows.map(toPublicNewsletterIssue);
}
async function getNewsletterIssue(db, slug) {
  const rows = await db.select().from(newsletterIssues).where(and(eq(newsletterIssues.slug, slug), eq(newsletterIssues.status, "sent"))).limit(1);
  const row = rows[0];
  return row ? toPublicNewsletterIssue(row) : null;
}
async function getNewsletterIssueCount(db) {
  const result = await db.select({ count: drizzleCount() }).from(newsletterIssues).where(eq(newsletterIssues.status, "sent"));
  return result[0]?.count ?? 0;
}

// src/queries/linking.ts
import { eq as eq2, and as and2, desc as desc2 } from "drizzle-orm";

// ../types/src/blog-linking.ts
var RELATED_ARTICLES_MIN = 3;
var RELATED_ARTICLES_MAX = 5;
var TOPIC_MIN_POSTS = 2;
var BLOG_TOPIC_PATH = "/blog/topic";
function parseKeywords(raw) {
  let list = raw;
  if (typeof raw === "string") {
    const text2 = raw.trim();
    if (!text2) return [];
    try {
      list = JSON.parse(text2);
    } catch {
      list = text2.split(",");
    }
  }
  if (!Array.isArray(list)) return [];
  const seen = /* @__PURE__ */ new Set();
  const out = [];
  for (const item of list) {
    if (typeof item !== "string") continue;
    const k = item.trim();
    if (!k) continue;
    const key = normalizeTopicKey(k);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(k);
  }
  return out;
}
function normalizeTopicKey(keyword) {
  return keyword.toLowerCase().replace(/[^\p{L}\p{N}\s]+/gu, " ").replace(/\s+/g, " ").trim();
}
function topicSlug(keyword) {
  return normalizeTopicKey(keyword).replace(/\s+/g, "-");
}
var STOPWORDS = /* @__PURE__ */ new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "of",
  "to",
  "in",
  "for",
  "on",
  "with",
  "your",
  "you",
  "how",
  "what",
  "why",
  "when",
  "is",
  "are",
  "it",
  "this",
  "that",
  "from",
  "by",
  "at",
  "as",
  "can",
  "do",
  "does",
  "should",
  "guide",
  "tips",
  "vs",
  "about",
  "into",
  "our",
  "de",
  "la",
  "le",
  "les",
  "des",
  "du",
  "et",
  "un",
  "une",
  "pour",
  "en",
  "sur",
  "vous",
  "votre",
  "vos",
  "comment",
  "quoi",
  "que",
  "qui",
  "est",
  "sont",
  "dans",
  "avec",
  "par"
]);
function significantTokens(text2) {
  const out = /* @__PURE__ */ new Set();
  for (const raw of normalizeTopicKey(text2).split(" ")) {
    if (raw.length < 3 || STOPWORDS.has(raw)) continue;
    out.add(raw);
  }
  return out;
}
function createdAtMs(post) {
  const v = post.createdAt;
  if (v == null) return 0;
  if (v instanceof Date) return v.getTime();
  if (typeof v === "number") return v;
  const t = new Date(v).getTime();
  return Number.isFinite(t) ? t : 0;
}
function compareNewestFirst(a, b) {
  const d = createdAtMs(b) - createdAtMs(a);
  if (d !== 0) return d;
  return a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0;
}
function sameLanguage(a, b) {
  return (a.language ?? "en") === (b.language ?? "en");
}
var KEYWORD_WEIGHT = 3;
var TITLE_WEIGHT = 1;
function relatedScore(a, b) {
  const aKeys = new Set(parseKeywords(a.keywords).map(normalizeTopicKey));
  let shared = 0;
  for (const k of parseKeywords(b.keywords)) if (aKeys.has(normalizeTopicKey(k))) shared += 1;
  const aTitle = significantTokens(a.title);
  let words = 0;
  for (const w of significantTokens(b.title)) if (aTitle.has(w)) words += 1;
  return shared * KEYWORD_WEIGHT + words * TITLE_WEIGHT;
}
function rankRelatedPosts(current, candidates, opts = {}) {
  const min = Math.max(0, opts.min ?? RELATED_ARTICLES_MIN);
  const max = Math.max(min, opts.max ?? RELATED_ARTICLES_MAX);
  const pool = candidates.filter(
    (p) => p.id !== current.id && p.slug !== current.slug && sameLanguage(current, p)
  );
  const scored = pool.map((post) => ({ post, score: relatedScore(current, post) })).sort((x, y) => y.score - x.score || compareNewestFirst(x.post, y.post));
  const picked = [];
  for (const { post, score } of scored) {
    if (picked.length >= max) break;
    if (score <= 0) break;
    picked.push(post);
  }
  if (picked.length < min) {
    const chosen = new Set(picked.map((p) => p.id));
    for (const { post } of scored) {
      if (picked.length >= min) break;
      if (chosen.has(post.id)) continue;
      picked.push(post);
    }
  }
  return picked;
}
function buildBlogTopics(posts) {
  const bySlug = /* @__PURE__ */ new Map();
  for (const post of posts) {
    for (const keyword of parseKeywords(post.keywords)) {
      const slug = topicSlug(keyword);
      if (!slug) continue;
      let entry = bySlug.get(slug);
      if (!entry) {
        entry = { labels: /* @__PURE__ */ new Map(), posts: /* @__PURE__ */ new Map() };
        bySlug.set(slug, entry);
      }
      entry.labels.set(keyword, (entry.labels.get(keyword) ?? 0) + 1);
      entry.posts.set(post.slug, post);
    }
  }
  const topics = [];
  for (const [slug, entry] of bySlug) {
    if (entry.posts.size < TOPIC_MIN_POSTS) continue;
    const label = [...entry.labels.entries()].sort(
      (a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1)
    )[0][0];
    const ordered = [...entry.posts.values()].sort(compareNewestFirst).map((p) => p.slug);
    topics.push({ slug, label, postSlugs: ordered, postCount: ordered.length });
  }
  return topics.sort((a, b) => b.postCount - a.postCount || (a.slug < b.slug ? -1 : 1));
}
function topicsForPost(post, topics) {
  return topics.filter((t) => t.postSlugs.includes(post.slug));
}

// ../types/src/booking-cta.ts
var BOOKING_CTA_DEFAULT_LABEL = "Book a free 15-minute discovery call";
var BOOKING_WORDS = /\b(book|booking|reserve|reservation|discovery|consult|consultation|appointment|schedule|call|demo|quote|estimate|contact|get[\s-]?started|enquir|inquir|talk)/i;
var KIND_RANK = {
  form: 0,
  page: 1,
  phone: 2,
  email: 3
};
function pickBookingCallToAction(candidates) {
  let best = null;
  candidates.forEach((cta, index2) => {
    if (!cta.href) return;
    const hosted = cta.kind === "form" || cta.kind === "page";
    const named = hosted && BOOKING_WORDS.test(`${cta.label} ${cta.href}`);
    const rank = (named ? 0 : 10) + KIND_RANK[cta.kind] + index2 / 1e3;
    if (!best || rank < best.rank) best = { cta, rank };
  });
  return best ? best.cta : null;
}
var BOOKING_URL_CONTACT_KEY = "bookingUrl";
var BOOKING_URL_LABEL = "Online booking";
function resolveBookingCallToAction(candidates, bookingUrl) {
  const own = typeof bookingUrl === "string" ? bookingUrl.trim() : "";
  if (own) return { label: BOOKING_URL_LABEL, href: own, kind: "page" };
  return pickBookingCallToAction(candidates);
}
function bookingUrlFromContact(contact) {
  if (!contact || typeof contact !== "object") return null;
  const v = contact[BOOKING_URL_CONTACT_KEY];
  return typeof v === "string" && v.trim() ? v.trim() : null;
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

// src/queries/linking.ts
var MAX_POSTS = 5e3;
async function publishedPosts(db, locale) {
  const rows = await db.select().from(blogPosts).where(and2(eq2(blogPosts.status, "published"), eq2(blogPosts.language, locale))).orderBy(desc2(blogPosts.createdAt)).limit(MAX_POSTS);
  return rows;
}
async function getRelatedPosts(db, post, opts = {}) {
  const locale = opts.locale ?? post.language ?? "en";
  const candidates = await publishedPosts(db, locale);
  const rankOpts = {};
  if (opts.min !== void 0) rankOpts.min = opts.min;
  if (opts.max !== void 0) rankOpts.max = opts.max;
  return rankRelatedPosts(post, candidates, rankOpts);
}
async function getBlogTopics(db, locale = "en") {
  const posts = await publishedPosts(db, locale);
  return buildBlogTopics(posts);
}
async function getBlogTopicsForPost(db, post) {
  const topics = await getBlogTopics(db, post.language ?? "en");
  return topicsForPost(post, topics);
}
async function getBlogTopic(db, slug, locale = "en") {
  const posts = await publishedPosts(db, locale);
  const topic = buildBlogTopics(posts).find((t) => t.slug === slug.toLowerCase());
  if (!topic) return null;
  const wanted = new Set(topic.postSlugs);
  const bySlug = new Map(posts.filter((p) => wanted.has(p.slug)).map((p) => [p.slug, p]));
  return {
    topic,
    posts: topic.postSlugs.map((s) => bySlug.get(s)).filter((p) => Boolean(p))
  };
}
async function getBookingCallToAction(db) {
  const candidates = [];
  try {
    const rows = await db.select({ slug: forms.slug, name: forms.name }).from(forms).where(eq2(forms.status, "active")).orderBy(desc2(forms.updatedAt)).limit(10);
    for (const row of rows) {
      if (!row.slug) continue;
      candidates.push({ label: row.name || row.slug, href: `/forms/${row.slug}`, kind: "form" });
    }
  } catch (err) {
    console.error("[GrowthEngine] getBookingCallToAction: forms unavailable:", err);
  }
  const business = await getBusinessConfig(db);
  if (business?.phone) {
    candidates.push({
      label: `Call ${business.name ?? "us"}`,
      href: `tel:${business.phone.replace(/[^\d+]/g, "")}`,
      kind: "phone"
    });
  }
  if (business?.email) {
    candidates.push({ label: "Email us", href: `mailto:${business.email}`, kind: "email" });
  }
  return resolveBookingCallToAction(candidates, bookingUrlFromContact(business?.contact));
}

// src/handler/routes/content.ts
function toPage(row) {
  let keywords = null;
  if (row.keywords) {
    try {
      const parsed = JSON.parse(row.keywords);
      if (Array.isArray(parsed)) keywords = parsed.filter((k) => typeof k === "string");
    } catch {
      keywords = null;
    }
  }
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    content: row.content,
    language: row.language,
    service: row.service,
    city: row.city,
    status: row.status,
    heroImageUrl: row.heroImageUrl,
    seoTitle: row.seoTitle,
    seoDesc: row.seoDesc,
    keywords,
    publishedAt: row.publishedAt,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt
  };
}
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
var DEFAULT_LIMIT2 = 20;
var MAX_LIMIT2 = 5e3;
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
  if (limitParam === null) return DEFAULT_LIMIT2;
  const n = parseInt(limitParam, 10);
  if (isNaN(n) || n < 0) return DEFAULT_LIMIT2;
  if (n === 0) return MAX_LIMIT2;
  return Math.min(n, MAX_LIMIT2);
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
        const conditions = [eq3(blogPosts.status, "published")];
        if (locale) conditions.push(eq3(blogPosts.language, locale));
        const result = await db.select({ count: drizzleCount2() }).from(blogPosts).where(and3(...conditions));
        return Response.json(
          { count: result[0]?.count ?? 0 },
          { headers: CACHE_HEADERS }
        );
      }
      if (slug) {
        const slugMatch = or(eq3(blogPosts.slug, slug), eq3(blogPosts.urlPath, slug));
        const conditions = [slugMatch];
        if (locale) conditions.push(eq3(blogPosts.language, locale));
        const post = await db.select().from(blogPosts).where(and3(...conditions)).limit(1);
        return Response.json(post[0] ?? null, { headers: CACHE_HEADERS });
      }
      const authorSlug = url.searchParams.get("authorSlug");
      if (authorSlug) {
        const author = await db.select().from(blogAuthors).where(eq3(blogAuthors.slug, authorSlug)).limit(1);
        if (!author[0]) {
          return Response.json([], { headers: CACHE_HEADERS });
        }
        const language2 = locale ?? "en";
        const limit2 = parseLimit(url.searchParams.get("limit"));
        const offset2 = parseOffset(url.searchParams.get("offset"));
        const where2 = and3(
          eq3(blogPosts.status, "published"),
          eq3(blogPosts.language, language2),
          eq3(blogPosts.authorId, author[0].id)
        );
        const posts2 = await db.select().from(blogPosts).where(where2).orderBy(desc3(blogPosts.createdAt)).limit(limit2).offset(offset2);
        return Response.json(posts2, { headers: CACHE_HEADERS });
      }
      const language = locale ?? "en";
      const limit = parseLimit(url.searchParams.get("limit"));
      const offset = parseOffset(url.searchParams.get("offset"));
      const fields = parseBlogFields(url.searchParams.get("fields"));
      const where = and3(
        eq3(blogPosts.status, "published"),
        eq3(blogPosts.language, language)
      );
      const posts = fields ? await db.select(fields).from(blogPosts).where(where).orderBy(desc3(blogPosts.createdAt)).limit(limit).offset(offset) : await db.select().from(blogPosts).where(where).orderBy(desc3(blogPosts.createdAt)).limit(limit).offset(offset);
      return Response.json(posts, { headers: CACHE_HEADERS });
    }
    if (type === "blog-topics") {
      const language = locale ?? "en";
      if (slug) {
        const page = await getBlogTopic(db, slug, language);
        return Response.json(page, { headers: CACHE_HEADERS });
      }
      const topics = await getBlogTopics(db, language);
      return Response.json(topics, { headers: CACHE_HEADERS });
    }
    if (type === "landing_page") {
      if (slug) {
        const page = await db.select().from(landingPages).where(and3(eq3(landingPages.slug, slug), eq3(landingPages.status, "published"))).limit(1);
        return Response.json(page[0] ? toPage(page[0]) : null, { headers: CACHE_HEADERS });
      }
      const limit = parseLimit(url.searchParams.get("limit"));
      const offset = parseOffset(url.searchParams.get("offset"));
      const pages = await db.select().from(landingPages).where(eq3(landingPages.status, "published")).orderBy(desc3(landingPages.createdAt)).limit(limit).offset(offset);
      return Response.json(pages.map(toPage), { headers: CACHE_HEADERS });
    }
    if (type === "blog-authors") {
      if (slug) {
        const author = await db.select().from(blogAuthors).where(eq3(blogAuthors.slug, slug)).limit(1);
        return Response.json(author[0] ?? null, { headers: CACHE_HEADERS });
      }
      const authors = await db.select().from(blogAuthors).orderBy(desc3(blogAuthors.createdAt));
      return Response.json(authors, { headers: CACHE_HEADERS });
    }
    if (type === "social") {
      if (platform === "instagram" || platform === "linkedin" || platform === "facebook") {
        const posts2 = await db.select().from(socialPosts).where(eq3(socialPosts.platform, platform)).orderBy(desc3(socialPosts.createdAt)).limit(20);
        return Response.json(posts2, { headers: CACHE_HEADERS });
      }
      const posts = await db.select().from(socialPosts).orderBy(desc3(socialPosts.createdAt)).limit(20);
      return Response.json(posts, { headers: CACHE_HEADERS });
    }
    if (type === "newsletter") {
      const countOnly = url.searchParams.get("count") === "true";
      if (countOnly) {
        const result = await db.select({ count: drizzleCount2() }).from(newsletterIssues).where(eq3(newsletterIssues.status, "sent"));
        return Response.json({ count: result[0]?.count ?? 0 }, { headers: CACHE_HEADERS });
      }
      if (slug) {
        const rows2 = await db.select().from(newsletterIssues).where(and3(eq3(newsletterIssues.slug, slug), eq3(newsletterIssues.status, "sent"))).limit(1);
        return Response.json(
          rows2[0] ? toPublicNewsletterIssue(rows2[0]) : null,
          { headers: CACHE_HEADERS }
        );
      }
      const limit = parseLimit(url.searchParams.get("limit"));
      const offset = parseOffset(url.searchParams.get("offset"));
      const rows = await db.select().from(newsletterIssues).where(eq3(newsletterIssues.status, "sent")).orderBy(desc3(newsletterIssues.sentAt)).limit(limit).offset(offset);
      return Response.json(rows.map(toPublicNewsletterIssue), { headers: CACHE_HEADERS });
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
import { eq as eq4 } from "drizzle-orm";

// ../types/src/form.ts
var NEWSLETTER_OPT_IN_FIELD = "__newsletterOptIn";
var NEWSLETTER_NAME_FIELD_ALIASES = [
  "name",
  "firstname",
  "first_name",
  "fullname",
  "full_name"
];
function resolveNewsletterSignup(settings, fields, data) {
  const isNewsletterForm = settings?.kind === "newsletter";
  const optInEnabled = settings?.newsletterOptIn?.enabled === true;
  if (!isNewsletterForm && !optInEnabled) return { subscribe: false, reason: "not-newsletter" };
  if (!isNewsletterForm) {
    const answer = data[NEWSLETTER_OPT_IN_FIELD];
    const consented = answer === true || answer === "true" || answer === "on" || answer === 1;
    if (!consented) return { subscribe: false, reason: "no-consent" };
  }
  const emailField = fields.find((f) => f.type === "email");
  const rawEmail = emailField ? data[emailField.name] : void 0;
  const email = typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : "";
  if (!email) return { subscribe: false, reason: "no-email" };
  const nameField = fields.find(
    (f) => NEWSLETTER_NAME_FIELD_ALIASES.includes(f.name.toLowerCase().replace(/\s+/g, ""))
  );
  const rawName = nameField ? data[nameField.name] : void 0;
  const name = typeof rawName === "string" && rawName.trim() ? rawName.trim() : null;
  return { subscribe: true, email, name };
}
function normalizeSubmissionSourcePath(raw) {
  if (typeof raw !== "string") return null;
  let value = raw.trim();
  if (!value || value.length > 2048) return null;
  if (/^https?:\/\//i.test(value)) {
    try {
      value = new URL(value).pathname;
    } catch {
      return null;
    }
  }
  if (!value.startsWith("/")) return null;
  value = value.split(/[?#]/, 1)[0] ?? "";
  value = value.replace(/\/+$/, "");
  if (!value) return "/";
  return value.length > 512 ? null : value;
}

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

// ../types/src/review-kits.ts
var REVIEW_PLATFORM_CONFIG = {
  google: {
    id: "google",
    label: "Google Business Profile",
    whyItMatters: "Google reviews are the biggest single factor in whether you show up in the local map results when someone nearby searches for what you do.",
    policy: "ask_freely",
    policyNote: 'Google is fine with you asking customers for reviews \u2014 as long as you ask everyone, not just the happy ones, and never offer a discount or freebie in exchange. Asking only satisfied customers ("review gating") is against Google policy and can get your reviews removed.',
    promptGuidance: [
      "Google allows direct requests. Short asks work best: one sentence of thanks, one clear link, no pressure.",
      "Google reviews are read by both people and the local ranking algorithm, so the angles should nudge the customer to name the specific service and the city or neighbourhood in their own words.",
      "Never suggest offering an incentive, and never suggest asking only customers who seemed happy \u2014 say plainly that the ask goes to everyone.",
      "The ask should mention that it takes about a minute, because that is the objection."
    ].join(" "),
    channels: ["sms", "email", "in_person", "printed", "social"],
    countSource: "google_profile"
  },
  yelp: {
    id: "yelp",
    label: "Yelp",
    whyItMatters: 'Yelp still ranks high for "near me" searches in a lot of categories, and its own search sends buyers who are ready to call.',
    policy: "no_direct_asks",
    policyNote: "Yelp does NOT allow you to ask for reviews \u2014 not by text, not by email, not in person. Reviews that look solicited get filtered out of your rating, so asking actively hurts you. What is allowed: showing that you are on Yelp (a window sticker, a link in your footer, your Yelp page in your email signature) and letting people find it themselves.",
    promptGuidance: [
      "Yelp PROHIBITS soliciting reviews. Do NOT produce any message that asks a customer to leave a review, however softly worded.",
      "Produce only passive-presence copy: signage/sticker wording, a website footer line, an email-signature line, a social post that mentions the Yelp page exists without requesting anything.",
      "The angles here are NOT things to tell a customer to say. Frame them instead as the topics the business should make sure it does well and talks about publicly, because those are the things Yelp reviewers tend to mention on their own.",
      "Say explicitly in the playbook that asking directly is against Yelp policy and gets reviews filtered."
    ].join(" "),
    channels: ["printed", "social"],
    countSource: "social_snapshot"
  },
  facebook: {
    id: "facebook",
    label: "Facebook",
    whyItMatters: "Facebook recommendations show up when people ask their local group for a referral, which is how a lot of neighbourhood businesses get found.",
    policy: "ask_freely",
    policyNote: "Facebook allows you to ask for recommendations. Keep it genuine and never pay for one. Recommendations are a yes/no plus a comment, so the comment is what does the work.",
    promptGuidance: [
      "Facebook recommendations are a yes/no plus a short comment, so the ask should nudge toward a specific sentence rather than a long review.",
      "The audience is often local friends-of-friends, so angles should lean on neighbourhood and word-of-mouth language over search phrases.",
      "Never suggest paying for or incentivising a recommendation."
    ].join(" "),
    channels: ["sms", "email", "in_person", "social"],
    countSource: "social_snapshot"
  },
  tripadvisor: {
    id: "tripadvisor",
    label: "TripAdvisor",
    whyItMatters: "For anywhere people eat, stay, or visit, TripAdvisor ranking is close to a booking engine.",
    policy: "ask_freely",
    policyNote: "TripAdvisor allows you to ask, but only if you ask every guest the same way. You may not offer anything in return, and you may not ask only the guests who seemed pleased.",
    promptGuidance: [
      "TripAdvisor reviewers write longer, experience-led reviews, so the angles should be about moments in the visit rather than service keywords.",
      "The ask works best shortly after the visit ends, while the detail is fresh \u2014 reflect that in the timing advice.",
      "Never suggest an incentive or selective asking."
    ].join(" "),
    channels: ["email", "in_person", "printed"],
    countSource: "social_snapshot"
  },
  general: {
    id: "general",
    label: "General / any site",
    whyItMatters: "The same ask works on any review site you end up on \u2014 industry directories, a booking platform, or your own site testimonials.",
    policy: "ask_freely",
    policyNote: "These are platform-neutral. Before you use them anywhere, check that site's own rules on asking for reviews \u2014 some (like Yelp) forbid it entirely.",
    promptGuidance: [
      'Keep every message platform-neutral: refer to "leaving a review" and use a placeholder link, never name a specific site.',
      "This kit is the fallback for review sites we do not have a dedicated profile for, including industry directories and booking platforms.",
      "Because the destination is unknown, include a line in the playbook telling the owner to check that site's solicitation rules first."
    ].join(" "),
    channels: ["sms", "email", "in_person", "printed", "social"],
    countSource: null
  }
};

// ../types/src/index.ts
var SDK_VERSION = "0.1.83";

// src/handler/routes/forms.ts
async function trySubscribeFromForm(db, settings, fields, data) {
  try {
    const resolution = resolveNewsletterSignup(settings, fields, data);
    if (!resolution.subscribe) {
      if (resolution.reason === "no-email") {
        console.error(
          "[GrowthEngine] newsletter opt-in skipped \u2014 the form has no email field with a value"
        );
      }
      return;
    }
    const { email, name } = resolution;
    const now = /* @__PURE__ */ new Date();
    const existing = await db.select().from(newsletterSubscribers).where(eq4(newsletterSubscribers.email, email)).limit(1);
    const row = existing[0];
    if (!row) {
      await db.insert(newsletterSubscribers).values({
        id: crypto.randomUUID(),
        email,
        name,
        status: "subscribed",
        source: "sdk",
        createdAt: now,
        updatedAt: now
      });
      console.log("[GrowthEngine] newsletter opt-in \u2014 subscribed via form |", email);
      return;
    }
    if (row.status === "unsubscribed") {
      await db.update(newsletterSubscribers).set({
        status: "subscribed",
        unsubscribedAt: null,
        unsubscribeIssueId: null,
        ...name ? { name } : {},
        updatedAt: now
      }).where(eq4(newsletterSubscribers.id, row.id));
      console.log("[GrowthEngine] newsletter opt-in \u2014 resubscribed via form |", email);
      return;
    }
    if (name && name !== row.name) {
      await db.update(newsletterSubscribers).set({ name, updatedAt: now }).where(eq4(newsletterSubscribers.id, row.id));
    }
  } catch (err) {
    console.error("[GrowthEngine] newsletter opt-in from form failed:", err);
  }
}
async function tryCreateCrmContact(db, submissionId, data) {
  try {
    const email = data.email ?? data.Email ?? data.e_mail;
    const firstName = data.firstName ?? data.first_name ?? data.name ?? data.Name;
    const lastName = data.lastName ?? data.last_name;
    const phone = data.phone ?? data.Phone ?? data.telephone;
    const company = data.company ?? data.Company ?? data.organization;
    if (!email && !firstName) return;
    if (email) {
      const existing = await db.select({ id: crmContacts.id }).from(crmContacts).where(eq4(crmContacts.email, String(email))).limit(1);
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
  const startedAt = Date.now();
  console.log(
    `[GrowthEngine] forms.notify \u2192 POST ${url} | form=${formSlug} | recipients=${notifyEmails.length} [${notifyEmails.join(", ")}] | replyTo=${senderEmail ?? "(none)"} | from=${from ?? "(default)"} | useEmailTemplate=${useEmailTemplate ?? false}`
  );
  try {
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
    const durationMs = Date.now() - startedAt;
    const contentType = res.headers.get("content-type") ?? "(none)";
    const rawBody = await res.text().catch(() => "(unreadable body)");
    if (!res.ok) {
      console.error(
        `[GrowthEngine] forms.notify FAILED | status=${res.status} | contentType=${contentType} | durationMs=${durationMs} | body=${rawBody.slice(0, 300)}`
      );
      return;
    }
    let parsed = null;
    try {
      parsed = JSON.parse(rawBody);
    } catch {
      console.error(
        `[GrowthEngine] forms.notify WARN non-JSON 2xx body | status=${res.status} | contentType=${contentType} | the request likely did NOT reach the Brain route (deployment protection / SSO / redirect). body=${rawBody.slice(0, 300)}`
      );
      return;
    }
    const sent = typeof parsed?.sent === "number" ? parsed.sent : void 0;
    const total = typeof parsed?.total === "number" ? parsed.total : notifyEmails.length;
    if (sent === void 0) {
      console.log(
        `[GrowthEngine] forms.notify accepted | status=${res.status} | durationMs=${durationMs} | response=${rawBody.slice(0, 200)}`
      );
    } else if (sent < total) {
      console.error(
        `[GrowthEngine] forms.notify PARTIAL | only ${sent}/${total} emails sent \u2014 emails are failing INSIDE Brain. Check Brain logs for '[GrowthEngine] form submission email failed' / 'form submission email error'. durationMs=${durationMs}`
      );
    } else {
      console.log(`[GrowthEngine] forms.notify OK | ${sent}/${total} emails sent | durationMs=${durationMs}`);
    }
  } catch (err) {
    console.error(`[GrowthEngine] forms.notify THREW after ${Date.now() - startedAt}ms | url=${url} | error:`, err);
  }
}
async function trySendConfirmationEmail(brainApiUrl, brainApiKey, senderEmail, formName, subject, message, data, replyTo, useEmailTemplate, from) {
  const url = `${brainApiUrl}/api/sdk/forms/confirm`;
  const startedAt = Date.now();
  console.log(
    `[GrowthEngine] forms.confirm \u2192 POST ${url} | to=${senderEmail} | form=${formName} | replyTo=${replyTo ?? "(none)"} | from=${from ?? "(default)"} | useEmailTemplate=${useEmailTemplate ?? false}`
  );
  try {
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
    const durationMs = Date.now() - startedAt;
    const contentType = res.headers.get("content-type") ?? "(none)";
    const rawBody = await res.text().catch(() => "(unreadable body)");
    if (!res.ok) {
      console.error(
        `[GrowthEngine] forms.confirm FAILED | status=${res.status} | contentType=${contentType} | durationMs=${durationMs} | body=${rawBody.slice(0, 300)}`
      );
      return;
    }
    if (!contentType.includes("application/json") && rawBody.trim().startsWith("<")) {
      console.error(
        `[GrowthEngine] forms.confirm WARN non-JSON 2xx body | status=${res.status} | contentType=${contentType} | the request likely did NOT reach the Brain route (deployment protection / SSO / redirect). body=${rawBody.slice(0, 300)}`
      );
      return;
    }
    console.log(
      `[GrowthEngine] forms.confirm OK | status=${res.status} | durationMs=${durationMs} | response=${rawBody.slice(0, 200)}`
    );
  } catch (err) {
    console.error(`[GrowthEngine] forms.confirm THREW after ${Date.now() - startedAt}ms | url=${url} | error:`, err);
  }
}
function buildSubmissionMeta(request, rawSourcePath) {
  const referrer = request.headers.get("referer");
  const userAgent = request.headers.get("user-agent");
  const sourcePath = normalizeSubmissionSourcePath(rawSourcePath) ?? normalizeSubmissionSourcePath(referrer);
  const meta = {
    ...sourcePath ? { sourcePath } : {},
    ...referrer ? { referrer } : {},
    ...userAgent ? { userAgent } : {}
  };
  return Object.keys(meta).length > 0 ? meta : null;
}
async function tryTriggerPipelines(brainApiUrl, brainApiKey, formId, submissionData, db) {
  try {
    const email = submissionData.email ?? submissionData.Email ?? submissionData.e_mail;
    if (!email) return;
    const rows = await db.select({ id: crmContacts.id, firstName: crmContacts.firstName, lastName: crmContacts.lastName }).from(crmContacts).where(eq4(crmContacts.email, String(email))).limit(1);
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
      const rows = await db.select().from(forms).where(eq4(forms.status, "active"));
      return Response.json(rows);
    }
    if (action === "get" && slug) {
      const rows = await db.select().from(forms).where(eq4(forms.slug, slug)).limit(1);
      return Response.json(rows[0] ?? null);
    }
    if (request.method === "POST" && action === "submit" && slug) {
      const body = await request.json();
      const data = body.data;
      if (!data || typeof data !== "object") {
        return Response.json({ error: "Missing or invalid data field" }, { status: 400 });
      }
      const formRows = await db.select().from(forms).where(eq4(forms.slug, slug)).limit(1);
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
      const meta = buildSubmissionMeta(request, body.sourcePath);
      await db.insert(formSubmissions).values({
        id,
        formId: form.id,
        data: JSON.stringify(data),
        ...meta ? { metadata: JSON.stringify(meta) } : {},
        createdAt: /* @__PURE__ */ new Date()
      });
      console.log("[GrowthEngine] form submission stored | id:", id, "| slug:", slug);
      await tryCreateCrmContact(db, id, data);
      const settings = form.settings ? JSON.parse(form.settings) : null;
      await trySubscribeFromForm(db, settings, fields, data);
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
import { eq as eq5 } from "drizzle-orm";
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
        const existing = await db.select({ id: crmContacts.id }).from(crmContacts).where(eq5(crmContacts.email, body.email.trim())).limit(1);
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

// src/handler/routes/newsletter.ts
import { eq as eq6 } from "drizzle-orm";
var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var MAX_EMAIL_LENGTH = 320;
async function handleNewsletter(request, tursoUrl, tursoAuthToken) {
  try {
    const url = new URL(request.url);
    const action = url.searchParams.get("action");
    if (request.method !== "POST") {
      return Response.json({ error: "Method not allowed" }, { status: 405 });
    }
    if (action !== "subscribe" && action !== "unsubscribe") {
      return Response.json({ error: "Invalid action" }, { status: 400 });
    }
    const body = await request.json().catch(() => null);
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const rawName = typeof body?.name === "string" ? body.name.trim() : "";
    const name = rawName.length > 0 ? rawName : null;
    if (!email || email.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(email)) {
      return Response.json({ error: "A valid email is required" }, { status: 400 });
    }
    const db = getClientDb(tursoUrl, tursoAuthToken);
    const now = /* @__PURE__ */ new Date();
    if (action === "unsubscribe") {
      const rows = await db.select().from(newsletterSubscribers).where(eq6(newsletterSubscribers.email, email)).limit(1);
      const row2 = rows[0];
      if (row2 && row2.status !== "unsubscribed") {
        await db.update(newsletterSubscribers).set({ status: "unsubscribed", unsubscribedAt: now, updatedAt: now }).where(eq6(newsletterSubscribers.id, row2.id));
      }
      return Response.json({ ok: true, unsubscribed: true });
    }
    const existing = await db.select().from(newsletterSubscribers).where(eq6(newsletterSubscribers.email, email)).limit(1);
    const row = existing[0];
    if (!row) {
      await db.insert(newsletterSubscribers).values({
        id: crypto.randomUUID(),
        email,
        name,
        status: "subscribed",
        source: "sdk",
        createdAt: now,
        updatedAt: now
      });
    } else if (row.status === "unsubscribed") {
      await db.update(newsletterSubscribers).set({
        status: "subscribed",
        unsubscribedAt: null,
        unsubscribeIssueId: null,
        ...name ? { name } : {},
        updatedAt: now
      }).where(eq6(newsletterSubscribers.id, row.id));
    } else if (name && name !== row.name) {
      await db.update(newsletterSubscribers).set({ name, updatedAt: now }).where(eq6(newsletterSubscribers.id, row.id));
    }
    return Response.json({ ok: true, subscribed: true });
  } catch (err) {
    console.error("[GrowthEngine] newsletter route error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// src/handler/routes/updates.ts
import { and as and4, eq as eq7, sql } from "drizzle-orm";
var CACHE_HEADERS3 = {
  "Cache-Control": "s-maxage=60, stale-while-revalidate=300"
};
var DEFAULT_LIMIT3 = 20;
var MAX_LIMIT3 = 100;
function parseLimit2(limitParam) {
  if (limitParam === null) return DEFAULT_LIMIT3;
  const n = Number.parseInt(limitParam, 10);
  if (Number.isNaN(n) || n < 1) return DEFAULT_LIMIT3;
  return Math.min(n, MAX_LIMIT3);
}
async function handleUpdates(request, tursoUrl, tursoAuthToken) {
  try {
    if (request.method !== "GET") {
      return Response.json({ error: "Method not allowed" }, { status: 405 });
    }
    const url = new URL(request.url);
    const action = url.searchParams.get("action");
    const db = getClientDb(tursoUrl, tursoAuthToken);
    if (action === "lists") {
      const lists = await db.select({
        id: updateLists.id,
        name: updateLists.name,
        slug: updateLists.slug,
        description: updateLists.description
      }).from(updateLists).orderBy(updateLists.name);
      return Response.json({ lists }, {
        headers: CACHE_HEADERS3
      });
    }
    if (action === "items") {
      const listSlug = url.searchParams.get("list")?.trim();
      if (!listSlug) {
        return Response.json({ error: "A list slug is required" }, { status: 400 });
      }
      const listRows = await db.select({
        id: updateLists.id,
        name: updateLists.name,
        slug: updateLists.slug,
        description: updateLists.description
      }).from(updateLists).where(eq7(updateLists.slug, listSlug)).limit(1);
      const list = listRows[0];
      if (!list) {
        return Response.json({ error: "Update list not found" }, { status: 404 });
      }
      const limit = parseLimit2(url.searchParams.get("limit"));
      const items = await db.select({
        id: updateItems.id,
        title: updateItems.title,
        body: updateItems.body,
        imageUrl: updateItems.imageUrl,
        eventDate: updateItems.eventDate,
        publishedAt: updateItems.publishedAt
      }).from(updateItems).where(and4(eq7(updateItems.listId, list.id), eq7(updateItems.status, "published"))).orderBy(
        sql`coalesce(${updateItems.eventDate}, ${updateItems.publishedAt}, ${updateItems.createdAt}) desc`
      ).limit(limit);
      return Response.json(
        { list, items },
        { headers: CACHE_HEADERS3 }
      );
    }
    return Response.json({ error: "Invalid action" }, { status: 400 });
  } catch (err) {
    const url = new URL(request.url);
    console.error(`[sdk:updates] route error (${url.search}):`, err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// src/handler/routes/variables.ts
import { asc, eq as eq8 } from "drizzle-orm";
var CACHE_HEADERS4 = {
  "Cache-Control": "s-maxage=60, stale-while-revalidate=300"
};
async function handleVariables(request, tursoUrl, tursoAuthToken) {
  try {
    if (request.method !== "GET") {
      return Response.json({ error: "Method not allowed" }, { status: 405 });
    }
    const db = getClientDb(tursoUrl, tursoAuthToken);
    const rows = await db.select({ key: variables.key, value: variables.value }).from(variables).where(eq8(variables.scope, "company")).orderBy(asc(variables.updatedAt));
    const map = {};
    for (const row of rows) {
      map[row.key] = row.value;
    }
    return Response.json({ variables: map }, { headers: CACHE_HEADERS4 });
  } catch (err) {
    console.error("[sdk:variables] route error:", err);
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
function createDisabledHandler(structuralLinks) {
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
    if (route === "newsletter") {
      return Response.json({ ok: false, error: "SDK not configured" });
    }
    if (route === "updates") {
      const action = url.searchParams.get("action");
      if (action === "items") return Response.json({ list: null, items: [] });
      return Response.json({ lists: [] });
    }
    if (route === "variables") {
      return Response.json({ variables: {} });
    }
    if (route === "sdk-status") {
      return Response.json({ sdkVersion: SDK_VERSION, structuralLinks, disabled: true });
    }
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  return { GET: handleRequest, POST: handleRequest };
}
function GrowthEngineHandler(options) {
  const { brainApiUrl, brainApiKey, tursoUrl, tursoAuthToken } = options;
  const structuralLinks = options.structuralLinks === true;
  const missing = [];
  if (!brainApiUrl?.trim()) missing.push("BRAIN_API_URL");
  if (!brainApiKey?.trim()) missing.push("BRAIN_API_KEY");
  if (!tursoUrl?.trim()) missing.push("TURSO_DATABASE_URL");
  if (!tursoAuthToken?.trim()) missing.push("TURSO_AUTH_TOKEN");
  if (missing.length > 0) {
    console.warn(
      `[GrowthEngine] SDK disabled \u2014 missing env vars: ${missing.join(", ")}. SDK features will return empty data.`
    );
    return createDisabledHandler(structuralLinks);
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
    if (route === "newsletter") {
      return handleNewsletter(request, dbUrl, dbToken);
    }
    if (route === "updates") {
      return handleUpdates(request, dbUrl, dbToken);
    }
    if (route === "variables") {
      return handleVariables(request, dbUrl, dbToken);
    }
    if (route === "sdk-status") {
      if (!isValidUrl2(apiUrl)) {
        return Response.json({
          sdkVersion: SDK_VERSION,
          structuralLinks,
          error: "BRAIN_API_URL is not a valid URL"
        });
      }
      try {
        const res = await fetch(`${apiUrl}/api/sdk-versions`);
        const manifest = await res.json();
        return Response.json(
          { sdkVersion: SDK_VERSION, structuralLinks, manifest },
          { status: res.status }
        );
      } catch (err) {
        console.error("[GrowthEngine] sdk-status fetch error:", err);
        return Response.json({
          sdkVersion: SDK_VERSION,
          structuralLinks,
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
import { eq as eq9, desc as desc4, and as and5, or as or2, count as drizzleCount3 } from "drizzle-orm";
var DEFAULT_LIMIT4 = 20;
var MAX_LIMIT4 = 5e3;
function resolveLimit2(limit) {
  if (limit === void 0) return DEFAULT_LIMIT4;
  if (limit <= 0) return MAX_LIMIT4;
  return Math.min(limit, MAX_LIMIT4);
}
async function getBlogPosts(db, opts) {
  const locale = opts?.locale ?? "en";
  const limit = resolveLimit2(opts?.limit);
  const offset = opts?.offset ?? 0;
  const rows = await db.select().from(blogPosts).where(and5(
    eq9(blogPosts.status, "published"),
    eq9(blogPosts.language, locale)
  )).orderBy(desc4(blogPosts.createdAt)).limit(limit).offset(offset);
  return rows;
}
async function getBlogPost(db, slug, locale) {
  const slugMatch = or2(eq9(blogPosts.slug, slug), eq9(blogPosts.urlPath, slug));
  const conditions = [slugMatch];
  if (locale) conditions.push(eq9(blogPosts.language, locale));
  const rows = await db.select().from(blogPosts).where(and5(...conditions)).limit(1);
  return rows[0] ?? null;
}
async function getBlogPostCount(db, locale) {
  const conditions = [eq9(blogPosts.status, "published")];
  if (locale) conditions.push(eq9(blogPosts.language, locale));
  const result = await db.select({ count: drizzleCount3() }).from(blogPosts).where(and5(...conditions));
  return result[0]?.count ?? 0;
}
async function getBlogAuthors(db) {
  const rows = await db.select().from(blogAuthors).orderBy(desc4(blogAuthors.createdAt));
  return rows;
}
async function getBlogAuthor(db, slug) {
  const rows = await db.select().from(blogAuthors).where(eq9(blogAuthors.slug, slug)).limit(1);
  return rows[0] ?? null;
}
async function getBlogAuthorById(db, id) {
  const rows = await db.select().from(blogAuthors).where(eq9(blogAuthors.id, id)).limit(1);
  return rows[0] ?? null;
}
async function getAuthorPosts(db, authorSlug, opts) {
  const author = await db.select().from(blogAuthors).where(eq9(blogAuthors.slug, authorSlug)).limit(1);
  if (!author[0]) return [];
  const locale = opts?.locale ?? "en";
  const limit = resolveLimit2(opts?.limit);
  const offset = opts?.offset ?? 0;
  const rows = await db.select().from(blogPosts).where(and5(
    eq9(blogPosts.status, "published"),
    eq9(blogPosts.language, locale),
    eq9(blogPosts.authorId, author[0].id)
  )).orderBy(desc4(blogPosts.createdAt)).limit(limit).offset(offset);
  return rows;
}

// src/queries/landing.ts
import { eq as eq10, desc as desc5 } from "drizzle-orm";
var MAX_LIMIT5 = 1e3;
function toPage2(row) {
  return {
    ...row,
    keywords: row.keywords ? JSON.parse(row.keywords) : null
  };
}
async function getLandingPages(db, opts) {
  const limit = Math.min(opts?.limit && opts.limit > 0 ? opts.limit : MAX_LIMIT5, MAX_LIMIT5);
  const rows = await db.select().from(landingPages).where(eq10(landingPages.status, "published")).orderBy(desc5(landingPages.createdAt)).limit(limit).offset(opts?.offset ?? 0);
  return rows.map(toPage2);
}
async function getLandingPage(db, slug) {
  const rows = await db.select().from(landingPages).where(eq10(landingPages.slug, slug)).limit(1);
  const row = rows[0];
  if (!row || row.status !== "published") return null;
  return toPage2(row);
}

// src/queries/forms.ts
import { eq as eq11 } from "drizzle-orm";
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
  const rows = await db.select().from(forms).where(eq11(forms.status, "active"));
  return rows.map(parseFormRow);
}
async function getFormBySlug(db, slug) {
  const rows = await db.select().from(forms).where(eq11(forms.slug, slug)).limit(1);
  const row = rows[0];
  if (!row) return null;
  return parseFormRow(row);
}

// src/robots.ts
async function fetchRobotsPolicy(options) {
  const brainApiUrl = options.brainApiUrl?.trim();
  const brainApiKey = options.brainApiKey?.trim();
  if (!brainApiUrl || !brainApiKey) return null;
  try {
    const url = `${brainApiUrl.replace(/\/+$/, "")}/api/sdk/robots-policy`;
    const init = {
      headers: { "x-api-key": brainApiKey },
      // Next.js data-cache hint — a policy flip reaches the live robots.txt
      // within this window. Ignored by plain fetch outside Next.
      next: { revalidate: options.revalidateSeconds ?? 300 }
    };
    const res = await fetch(url, init);
    if (!res.ok) {
      console.error(`[GrowthEngine] robots-policy fetch returned ${res.status}`);
      return null;
    }
    const data = await res.json();
    if (!data || typeof data !== "object" || !Array.isArray(data.bots)) return null;
    const aiCrawlers = data.aiCrawlers === "allow" || data.aiCrawlers === "block" ? data.aiCrawlers : null;
    return {
      aiCrawlers,
      bots: data.bots.filter((b) => typeof b === "string" && b.trim() !== "")
    };
  } catch (err) {
    console.error("[GrowthEngine] robots-policy fetch failed:", err);
    return null;
  }
}
function buildAiCrawlerRules(policy) {
  if (!policy || policy.aiCrawlers === null || policy.bots.length === 0) return [];
  if (policy.aiCrawlers === "allow") {
    return policy.bots.map((bot) => ({ userAgent: bot, allow: "/" }));
  }
  return policy.bots.map((bot) => ({ userAgent: bot, disallow: "/" }));
}
async function getAiCrawlerRules(options) {
  return buildAiCrawlerRules(await fetchRobotsPolicy(options));
}
export {
  BLOG_TOPIC_PATH,
  BOOKING_CTA_DEFAULT_LABEL,
  GrowthEngineHandler,
  buildAiCrawlerRules,
  fetchRobotsPolicy,
  getActiveForms,
  getAiCrawlerRules,
  getAuthorPosts,
  getBlogAuthor,
  getBlogAuthorById,
  getBlogAuthors,
  getBlogPost,
  getBlogPostCount,
  getBlogPosts,
  getBlogTopic,
  getBlogTopics,
  getBlogTopicsForPost,
  getBookingCallToAction,
  getBusinessConfig,
  getClientDb,
  getFormBySlug,
  getLandingPage,
  getLandingPages,
  getNewsletterIssue,
  getNewsletterIssueCount,
  getNewsletterIssues,
  getRelatedPosts
};
//# sourceMappingURL=index.js.map