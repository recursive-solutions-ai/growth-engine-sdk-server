import "./chunk-PZ5AY32C.js";

// src/security-headers.ts
var DEFAULT_DIRECTIVES = {
  "default-src": ["'self'"],
  "script-src": [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com"
  ],
  "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
  "img-src": ["'self'", "data:", "blob:", "https:"],
  "font-src": ["'self'", "data:", "https://fonts.gstatic.com"],
  "connect-src": [
    "'self'",
    "https://www.google-analytics.com",
    "https://*.google-analytics.com",
    "https://*.analytics.google.com",
    "https://www.googletagmanager.com"
  ],
  "frame-src": [
    "'self'",
    "https://www.youtube.com",
    "https://www.youtube-nocookie.com",
    "https://player.vimeo.com",
    "https://calendly.com",
    "https://cal.com"
  ],
  "frame-ancestors": ["'self'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'"],
  "object-src": ["'none'"]
};
function dedupe(values) {
  return [...new Set(values)];
}
function buildContentSecurityPolicy(opts = {}) {
  const csp = opts.csp ?? {};
  const directives = /* @__PURE__ */ new Map();
  for (const [name, sources] of Object.entries(DEFAULT_DIRECTIVES)) {
    directives.set(name, [...sources]);
  }
  const ancestors = opts.frameAncestors ?? [];
  if (ancestors.length > 0) {
    directives.set("frame-ancestors", dedupe(["'self'", ...ancestors]));
  }
  for (const [name, sources] of Object.entries(csp.replace ?? {})) {
    if (sources) directives.set(name, dedupe(sources));
  }
  for (const [name, sources] of Object.entries(csp.extend ?? {})) {
    if (!sources || sources.length === 0) continue;
    directives.set(name, dedupe([...directives.get(name) ?? [], ...sources]));
  }
  if (csp.reportUri) directives.set("report-uri", [csp.reportUri]);
  return [...directives.entries()].map(([name, sources]) => sources.length > 0 ? `${name} ${sources.join(" ")}` : name).join("; ");
}
function securityHeaders(opts = {}) {
  const headers = [{ key: "X-Content-Type-Options", value: "nosniff" }];
  const hasAncestors = (opts.frameAncestors ?? []).length > 0;
  const frameOptions = opts.frameOptions ?? (hasAncestors ? false : "SAMEORIGIN");
  if (frameOptions) headers.push({ key: "X-Frame-Options", value: frameOptions });
  const referrer = opts.referrerPolicy ?? "strict-origin-when-cross-origin";
  if (referrer) headers.push({ key: "Referrer-Policy", value: referrer });
  const mode = opts.csp?.mode ?? "report-only";
  if (mode !== "off") {
    headers.push({
      key: mode === "enforce" ? "Content-Security-Policy" : "Content-Security-Policy-Report-Only",
      value: buildContentSecurityPolicy(opts)
    });
  }
  for (const extra of opts.extraHeaders ?? []) {
    const lower = extra.key.toLowerCase();
    const idx = headers.findIndex((h) => h.key.toLowerCase() === lower);
    if (idx >= 0) headers.splice(idx, 1);
    headers.push({ key: extra.key, value: extra.value });
  }
  return headers;
}
export {
  buildContentSecurityPolicy,
  securityHeaders
};
//# sourceMappingURL=security-headers.js.map