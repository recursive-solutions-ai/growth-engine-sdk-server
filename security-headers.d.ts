type SecurityHeader = {
    key: string;
    value: string;
};
type SecurityHeadersOptions = {
    /** Default 'SAMEORIGIN'. `false` omits X-Frame-Options. */
    frameOptions?: 'DENY' | 'SAMEORIGIN' | false;
    /**
     * Extra origins allowed to frame the site, added to CSP frame-ancestors
     * ('self' is always first). When non-empty and `frameOptions` is not set,
     * X-Frame-Options is omitted because it cannot express an allowlist.
     */
    frameAncestors?: string[];
    /** Default 'strict-origin-when-cross-origin'. `false` omits the header. */
    referrerPolicy?: string | false;
    csp?: {
        /** Default 'report-only'. */
        mode?: 'report-only' | 'enforce' | 'off';
        /** Extra sources appended per directive, deduped. */
        extend?: Partial<Record<string, string[]>>;
        /** Directive fully replaced. */
        replace?: Partial<Record<string, string[]>>;
        /** Adds a report-uri directive. */
        reportUri?: string;
    };
    /** Appended; the same key (case-insensitive) overrides a default. */
    extraHeaders?: SecurityHeader[];
};
declare function buildContentSecurityPolicy(opts?: SecurityHeadersOptions): string;
declare function securityHeaders(opts?: SecurityHeadersOptions): SecurityHeader[];

export { type SecurityHeader, type SecurityHeadersOptions, buildContentSecurityPolicy, securityHeaders };
