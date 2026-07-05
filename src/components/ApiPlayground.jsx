import { useState, useRef, useCallback } from 'react';

const SectionHeader = ({ slug, title }) => (
    <div className="mb-10">
        <p className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">
            {slug}
        </p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight">
            {title}
        </h2>
    </div>
);

// ---- JSON syntax highlighting ----
const highlightJson = (obj) => {
    const json = JSON.stringify(obj, null, 2);
    const tokens = [];
    // Regex to match JSON tokens: keys, strings, numbers, booleans, null, brackets, colons, commas
    const re = /("(?:\\.|[^"\\])*")\s*:|("(?:\\.|[^"\\])*")|(\b-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b)|(\btrue\b|\bfalse\b)|(\bnull\b)|([{}\[\]]|,|:)/g;
    let lastIndex = 0;
    let match;

    while ((match = re.exec(json)) !== null) {
        // Push any text before the match
        if (match.index > lastIndex) {
            tokens.push(json.slice(lastIndex, match.index));
        }

        if (match[1]) {
            // Key (string followed by colon)
            const key = match[1];
            tokens.push(
                <span key={tokens.length} className="json-key">{key}</span>
            );
            // The colon is part of the match, push it separately if it's a colon
            tokens.push(
                <span key={tokens.length} className="json-colon">: </span>
            );
        } else if (match[2]) {
            // String value
            tokens.push(
                <span key={tokens.length} className="json-string">{match[2]}</span>
            );
        } else if (match[3]) {
            // Number
            tokens.push(
                <span key={tokens.length} className="json-number">{match[3]}</span>
            );
        } else if (match[4]) {
            // Boolean
            tokens.push(
                <span key={tokens.length} className="json-boolean">{match[4]}</span>
            );
        } else if (match[5]) {
            // Null
            tokens.push(
                <span key={tokens.length} className="json-null">{match[5]}</span>
            );
        } else if (match[6]) {
            // Brackets, comma, colon
            const char = match[6];
            let cls = 'json-bracket';
            if (char === ',') cls = 'json-comma';
            if (char === ':') cls = 'json-colon';
            tokens.push(
                <span key={tokens.length} className={cls}>{char}</span>
            );
            // Add space after colon if not already handled
            if (char === ':') {
                tokens.push(' ');
            }
        }

        lastIndex = re.lastIndex;
    }

    // Push remaining text
    if (lastIndex < json.length) {
        tokens.push(json.slice(lastIndex));
    }

    return tokens;
};

// ---- Per-endpoint response scenarios ----
const ENDPOINT_SCENARIOS = {
    '/api/hello': {
        scenarios: [
            {
                weight: 80, status: 200, statusText: 'OK',
                headers: {
                    'content-type': 'application/json; charset=utf-8',
                    'x-request-id': () => crypto.randomUUID?.() || `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
                    'x-ratelimit-remaining': () => String(Math.floor(Math.random() * 100)),
                },
                body: {
                    greeting: 'Hello, world!',
                    message: 'Welcome to the API playground.',
                    timestamp: new Date().toISOString(),
                    version: 'v1.0.0',
                    docs: 'https://docs.example.com/api',
                },
            },
            {
                weight: 15, status: 404, statusText: 'Not Found',
                headers: {
                    'content-type': 'application/json; charset=utf-8',
                    'x-request-id': () => crypto.randomUUID?.() || `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
                },
                body: {
                    error: 'Endpoint not found',
                    code: 404,
                    path: '/api/hello',
                    hint: 'Try GET /api/health instead',
                    timestamp: new Date().toISOString(),
                },
            },
            {
                weight: 5, status: 503, statusText: 'Service Unavailable',
                headers: {
                    'content-type': 'application/json; charset=utf-8',
                    'x-request-id': () => crypto.randomUUID?.() || `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
                    'retry-after': () => String(Math.floor(10 + Math.random() * 50)),
                },
                body: {
                    error: 'Service temporarily unavailable',
                    retryAfter: () => Math.floor(10 + Math.random() * 50),
                    timestamp: new Date().toISOString(),
                },
            },
        ],
    },
    '/api/health': {
        scenarios: [
            {
                weight: 85, status: 200, statusText: 'OK',
                headers: {
                    'content-type': 'application/json; charset=utf-8',
                    'x-request-id': () => crypto.randomUUID?.() || `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
                },
                body: {
                    status: 'healthy',
                    uptime: () => `${Math.floor(60 + Math.random() * 1440)}m`,
                    database: 'connected',
                    cache: 'connected',
                    memoryUsage: () => `${(40 + Math.random() * 30).toFixed(1)}%`,
                    cpuLoad: () => `${(10 + Math.random() * 40).toFixed(1)}%`,
                    timestamp: new Date().toISOString(),
                },
            },
            {
                weight: 10, status: 200, statusText: 'OK',
                headers: {
                    'content-type': 'application/json; charset=utf-8',
                    'x-request-id': () => crypto.randomUUID?.() || `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
                },
                body: {
                    status: 'degraded',
                    uptime: () => `${Math.floor(60 + Math.random() * 1440)}m`,
                    database: 'connected',
                    cache: 'disconnected',
                    memoryUsage: () => `${(60 + Math.random() * 25).toFixed(1)}%`,
                    cpuLoad: () => `${(50 + Math.random() * 30).toFixed(1)}%`,
                    timestamp: new Date().toISOString(),
                },
            },
            {
                weight: 5, status: 503, statusText: 'Service Unavailable',
                headers: {
                    'content-type': 'application/json; charset=utf-8',
                    'x-request-id': () => crypto.randomUUID?.() || `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
                },
                body: {
                    status: 'down',
                    error: 'Health check failed',
                    database: 'disconnected',
                    cache: 'disconnected',
                    timestamp: new Date().toISOString(),
                },
            },
        ],
    },
    '/api/echo': {
        scenarios: [
            {
                weight: 85, status: 200, statusText: 'OK',
                headers: {
                    'content-type': 'application/json; charset=utf-8',
                    'x-request-id': () => crypto.randomUUID?.() || `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
                },
                body: {
                    method: 'POST',
                    path: '/api/echo',
                    body: {
                        name: 'Playground User',
                        message: 'Hello from the client!',
                        timestamp: new Date().toISOString(),
                    },
                    headers: {
                        'content-type': 'application/json',
                        accept: 'application/json',
                        'user-agent': 'ApiPlayground/1.0',
                    },
                    echo: true,
                    timestamp: new Date().toISOString(),
                },
            },
            {
                weight: 10, status: 400, statusText: 'Bad Request',
                headers: {
                    'content-type': 'application/json; charset=utf-8',
                    'x-request-id': () => crypto.randomUUID?.() || `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
                },
                body: {
                    error: 'Invalid request body',
                    code: 400,
                    details: 'Expected JSON with "message" field',
                    timestamp: new Date().toISOString(),
                },
            },
            {
                weight: 5, status: 413, statusText: 'Payload Too Large',
                headers: {
                    'content-type': 'application/json; charset=utf-8',
                    'x-request-id': () => crypto.randomUUID?.() || `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
                },
                body: {
                    error: 'Request entity too large',
                    code: 413,
                    limit: '1 MB',
                    timestamp: new Date().toISOString(),
                },
            },
        ],
    },
};

const pickScenario = (endpointPath) => {
    const endpoint = ENDPOINT_SCENARIOS[endpointPath];
    if (!endpoint) return ENDPOINT_SCENARIOS['/api/hello'].scenarios[0];
    const { scenarios } = endpoint;
    const totalWeight = scenarios.reduce((sum, s) => sum + s.weight, 0);
    let roll = Math.random() * totalWeight;
    for (const scenario of scenarios) {
        roll -= scenario.weight;
        if (roll <= 0) return scenario;
    }
    return scenarios[0];
};

const buildHeaders = (scenario, bodyStr) => {
    const headers = {};
    for (const [key, val] of Object.entries(scenario.headers)) {
        headers[key] = typeof val === 'function' ? val() : val;
    }
    if (!headers['content-length']) {
        headers['content-length'] = String(new TextEncoder().encode(bodyStr).length);
    }
    // Ensure date
    headers['date'] = new Date().toUTCString();
    return headers;
};

const buildTiming = () => ({
    dns: Math.round(8 + Math.random() * 25),
    tcp: Math.round(12 + Math.random() * 30),
    tls: Math.round(14 + Math.random() * 35),
    response: null, // filled in later
});

const ENDPOINTS = [
    { label: 'GET /api/hello', method: 'GET', path: '/api/hello' },
    { label: 'GET /api/health', method: 'GET', path: '/api/health' },
    { label: 'POST /api/echo', method: 'POST', path: '/api/echo' },
];

const CopyIcon = () => (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" aria-hidden="true">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
);

const CheckIcon = () => (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const ApiPlayground = () => {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [elapsed, setElapsed] = useState(null);
    const [endpointIndex, setEndpointIndex] = useState(0);
    const [showHeaders, setShowHeaders] = useState(false);
    const [timing, setTiming] = useState(null);
    const [responseHeaders, setResponseHeaders] = useState(null);
    const [copied, setCopied] = useState(false);
    const [statusCode, setStatusCode] = useState(null);
    const [statusText, setStatusText] = useState('');
    const [responseSize, setResponseSize] = useState(null);
    const timerRef = useRef(null);

    const sendRequest = () => {
        if (loading) return;
        setLoading(true);
        setResponse(null);
        setElapsed(null);
        setTiming(null);
        setResponseHeaders(null);
        setStatusCode(null);
        setStatusText('');
        setResponseSize(null);
        setCopied(false);

        const scenario = pickScenario(currentEndpoint.path);
        const body = scenario.body;
        // Resolve any function-valued fields in body
        const resolvedBody = {};
        for (const [key, val] of Object.entries(body)) {
            resolvedBody[key] = typeof val === 'function' ? val() : val;
        }
        const bodyStr = JSON.stringify(resolvedBody, null, 2);
        const headers = buildHeaders(scenario, bodyStr);
        const t = buildTiming();

        const start = performance.now();
        // Simulate network latency with more realistic breakdown
        const networkLatency = t.dns + t.tcp + t.tls;
        const serverLatency = 40 + Math.random() * 120;
        const totalLatency = networkLatency + serverLatency;

        timerRef.current = window.setTimeout(() => {
            t.response = serverLatency;
            setTiming(t);
            setResponse(resolvedBody);
            setResponseHeaders(headers);
            setElapsed(Math.round(totalLatency));
            setStatusCode(scenario.status);
            setStatusText(scenario.statusText);
            setResponseSize(bodyStr.length);
            setLoading(false);
        }, totalLatency);
    };

    const handleCopy = useCallback(async () => {
        if (!response) return;
        try {
            await navigator.clipboard.writeText(JSON.stringify(response, null, 2));
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1800);
        } catch {
            // Fallback
            const ta = document.createElement('textarea');
            ta.value = JSON.stringify(response, null, 2);
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1800);
        }
    }, [response]);

    const statusColor = statusCode >= 200 && statusCode < 300
        ? 'text-emerald-600 dark:text-emerald-400'
        : statusCode >= 400 && statusCode < 500
            ? 'text-amber-600 dark:text-amber-400'
            : statusCode >= 500
                ? 'text-red-600 dark:text-red-400'
                : 'text-neutral-600 dark:text-neutral-400';

    const currentEndpoint = ENDPOINTS[endpointIndex];

    return (
        <section id="playground" className="scroll-mt-24">
            <div className="mx-auto max-w-2xl px-6 py-16">
                <SectionHeader slug="§ 00 · PLAYGROUND" title="API Playground" />

                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-10">
                    A tiny request runner. Hit send and watch a GET request return a
                    hello-world payload — response is simulated client-side.
                </p>

                <div className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
                    {/* URL bar */}
                    <div className="flex items-stretch gap-px bg-neutral-200 dark:bg-neutral-800">
                        {/* Method + Endpoint selector */}
                        <div className="flex items-stretch gap-px bg-neutral-200 dark:bg-neutral-800 flex-1">
                            <span className="flex items-center bg-emerald-50 dark:bg-emerald-950/40 px-3 font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400 transition-colors group-hover:bg-emerald-100 dark:group-hover:bg-emerald-950/60">
                                {currentEndpoint.method}
                            </span>
                            <select
                                value={endpointIndex}
                                onChange={(e) => setEndpointIndex(Number(e.target.value))}
                                className="flex-1 bg-white dark:bg-neutral-950 px-3 py-3 font-mono text-xs text-neutral-700 dark:text-neutral-300 truncate appearance-none cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors outline-none border-0"
                            >
                                {ENDPOINTS.map((ep, i) => (
                                    <option key={i} value={i}>{ep.path}</option>
                                ))}
                            </select>
                        </div>
                        <button
                            onClick={sendRequest}
                            disabled={loading}
                            className="bg-neutral-900 dark:bg-neutral-50 px-5 font-mono text-xs font-bold text-white dark:text-neutral-900 transition-all hover:opacity-90 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-wait flex items-center gap-1.5"
                        >
                            {loading ? (
                                <>
                                    <span className="inline-block w-2 h-2 rounded-full bg-current animate-pulse" />
                                    Send
                                </>
                            ) : (
                                'Send'
                            )}
                        </button>
                    </div>

                    {/* Response panel */}
                    <div className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
                        {/* Response header bar */}
                        <div className="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 px-4 py-2">
                            <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                Response
                            </span>

                            {loading && (
                                <span className="font-mono text-[11px] text-neutral-400 dark:text-neutral-500 animate-pulse tabular-nums">
                                    Waiting…
                                </span>
                            )}

                            {!loading && statusCode && (
                                <span className={`status-badge font-mono text-[11px] font-bold ${statusColor} tabular-nums`}>
                                    {statusCode} {statusText}
                                </span>
                            )}

                            {!loading && responseSize && (
                                <span className="font-mono text-[11px] text-neutral-400 dark:text-neutral-500 tabular-nums">
                                    {responseSize} B
                                </span>
                            )}

                            {!loading && elapsed !== null && (
                                <span className="font-mono text-[11px] text-neutral-400 dark:text-neutral-500 tabular-nums ml-auto">
                                    {elapsed} ms
                                </span>
                            )}
                        </div>

                        {/* Timing breakdown */}
                        {!loading && timing && (
                            <div className="flex gap-3 px-4 py-2 border-b border-neutral-100 dark:border-neutral-800/60 bg-neutral-50/50 dark:bg-neutral-900/30">
                                {[
                                    { label: 'DNS', value: timing.dns },
                                    { label: 'TCP', value: timing.tcp },
                                    { label: 'TLS', value: timing.tls },
                                    { label: 'Server', value: timing.response },
                                ].map((item) => (
                                    <span key={item.label} className="font-mono text-[10px] text-neutral-500 dark:text-neutral-500 tabular-nums">
                                        {item.label}: <span className="font-medium text-neutral-700 dark:text-neutral-300">{item.value} ms</span>
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Headers toggle */}
                        {!loading && responseHeaders && (
                            <div className="border-b border-neutral-100 dark:border-neutral-800/60">
                                <button
                                    onClick={() => setShowHeaders(!showHeaders)}
                                    className="w-full flex items-center gap-2 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-700 dark:hover:text-neutral-300 transition-all active:scale-[1.01]"
                                >
                                    <span className={`inline-block transition-transform ${showHeaders ? 'rotate-90' : ''}`}>▸</span>
                                    Headers
                                </button>
                                {showHeaders && (
                                    <div className="px-4 pb-3 pt-1 space-y-0.5">
                                        {Object.entries(responseHeaders).map(([key, val]) => (
                                            <div key={key} className="grid grid-cols-[auto_1fr] gap-x-4 font-mono text-[10px] text-neutral-500 dark:text-neutral-500">
                                                <span className="text-neutral-600 dark:text-neutral-400">{key}:</span>
                                                <span className="break-all">{val}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Response body */}
                        <div className="relative">
                            <pre className="overflow-x-auto px-4 py-4 font-mono text-xs leading-relaxed text-neutral-700 dark:text-neutral-300 min-h-[8rem]">
                                {loading && (
                                    <div className="space-y-2.5 py-1">
                                        <div className="shimmer-line w-3/4" />
                                        <div className="shimmer-line w-1/2" />
                                        <div className="shimmer-line w-2/3" />
                                        <div className="shimmer-line w-5/6" />
                                        <div className="shimmer-line w-1/3" />
                                    </div>
                                )}
                                {!loading && !response && (
                                    <span className="text-neutral-400 dark:text-neutral-500 select-none">
                                        {'// Press Send to run the request'}
                                    </span>
                                )}
                                {!loading && response && highlightJson(response)}
                            </pre>

                            {/* Copy button */}
                            {!loading && response && (
                                <button
                                    onClick={handleCopy}
                                    className="absolute top-2 right-2 p-1.5 rounded-md text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:scale-110 active:scale-90 transition-all"
                                    title="Copy response"
                                >
                                    {copied ? <CheckIcon /> : <CopyIcon />}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ApiPlayground;
