import { useState, useRef, useEffect, useCallback, memo } from 'react';
import ReactMarkdown from 'react-markdown';
import { getRagContext } from '../utils/ragContext';

const BASE_MODEL = (import.meta.env.VITE_AI_MODEL || 'auto').trim();
const AI_BASE_URL = (import.meta.env.VITE_AI_BASE_URL || 'https://api.iamhc.cn/v1')
    .trim()
    .replace(/\/+$/, '');
const AI_API_URL = `${AI_BASE_URL}/chat/completions`;

// Keep payloads small — large history + long reasoning is what made Neo feel slow
const MAX_HISTORY_MESSAGES = 12;
const MAX_COMPLETION_TOKENS = 1024;

const TypingIndicator = ({ label = 'Typing...' }) => (
    <div className="flex items-center gap-1.5 px-4 py-3">
        <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400 animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1s' }} />
        <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400 animate-bounce" style={{ animationDelay: '200ms', animationDuration: '1s' }} />
        <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400 animate-bounce" style={{ animationDelay: '400ms', animationDuration: '1s' }} />
        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 italic">{label}</span>
    </div>
);

const markdownComponents = {
    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
    strong: ({ children }) => <strong className="font-semibold text-gray-900 dark:text-gray-100">{children}</strong>,
    em: ({ children }) => <em className="italic text-gray-700 dark:text-gray-300">{children}</em>,
    ul: ({ children }) => <ul className="my-2 ml-4 list-disc space-y-1">{children}</ul>,
    ol: ({ children }) => <ol className="my-2 ml-4 list-decimal space-y-1">{children}</ol>,
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    a: ({ href, children }) => (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-600 underline underline-offset-2">
            {children}
        </a>
    ),
    code: ({ className, children }) => {
        const isBlock = Boolean(className);
        if (isBlock) {
            return (
                <code className="block my-2 p-2.5 rounded-lg bg-gray-100 dark:bg-neutral-900 text-xs font-mono overflow-x-auto whitespace-pre">
                    {children}
                </code>
            );
        }
        return (
            <code className="px-1 py-0.5 rounded bg-gray-100 dark:bg-neutral-900 text-xs font-mono">
                {children}
            </code>
        );
    },
    pre: ({ children }) => <pre className="my-2 overflow-x-auto">{children}</pre>,
    h1: ({ children }) => <h1 className="text-base font-bold mb-1.5 mt-1">{children}</h1>,
    h2: ({ children }) => <h2 className="text-sm font-bold mb-1.5 mt-1">{children}</h2>,
    h3: ({ children }) => <h3 className="text-sm font-semibold mb-1 mt-1">{children}</h3>,
    blockquote: ({ children }) => (
        <blockquote className="border-l-2 border-orange-400 pl-3 my-2 text-gray-600 dark:text-gray-400 italic">
            {children}
        </blockquote>
    ),
    hr: () => <hr className="my-2 border-gray-200 dark:border-neutral-700" />,
};

const MarkdownMessage = memo(({ content }) => (
    <div className="chat-markdown break-words">
        <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
    </div>
));
MarkdownMessage.displayName = 'MarkdownMessage';

/**
 * Free/reasoning models (e.g. gpt-oss) sometimes return empty `content`
 * or put text in non-string / reasoning-shaped fields. Normalize that.
 */
const extractAssistantContent = (message) => {
    if (!message || typeof message !== 'object') return '';

    const normalizePart = (part) => {
        if (typeof part === 'string') return part;
        if (part == null) return '';
        if (typeof part === 'object') {
            if (typeof part.text === 'string') return part.text;
            if (typeof part.content === 'string') return part.content;
            if (part.type === 'text' && typeof part.text === 'string') return part.text;
        }
        return '';
    };

    const raw = message.content;
    let text = '';

    if (typeof raw === 'string') {
        text = raw;
    } else if (Array.isArray(raw)) {
        text = raw.map(normalizePart).join('');
    } else if (raw && typeof raw === 'object') {
        text = normalizePart(raw);
    }

    text = text.trim();
    if (text) return text;

    // Fallback: some providers only fill reasoning-style fields
    for (const key of ['reasoning', 'reasoning_content']) {
        if (typeof message[key] === 'string' && message[key].trim()) {
            return message[key].trim();
        }
    }

    if (Array.isArray(message.reasoning_details)) {
        const fromDetails = message.reasoning_details
            .map((d) => normalizePart(d) || (typeof d?.summary === 'string' ? d.summary : ''))
            .join('\n')
            .trim();
        if (fromDetails) return fromDetails;
    }

    return '';
};

// Static theme tokens — avoid reallocating every render
const theme = {
    buttonBg: 'bg-orange-400 hover:bg-orange-500',
    buttonText: 'text-white',
    closeButtonBg: 'bg-orange-500 hover:bg-orange-600',
    windowBg: 'bg-gray-50 dark:bg-neutral-900',
    windowBorder: 'border border-gray-200 dark:border-neutral-700',
    headerBg: 'bg-gray-200 dark:bg-neutral-700',
    headerText: 'text-gray-800 dark:text-gray-100',
    headerSubtext: 'text-gray-500 dark:text-gray-400',
    userMsgBg: 'bg-gray-700 dark:bg-gray-300',
    userMsgText: 'text-white dark:text-gray-900',
    botMsgBg: 'bg-white dark:bg-neutral-800',
    botMsgText: 'text-gray-800 dark:text-gray-200',
    botMsgBorder: 'border border-gray-200/80 dark:border-neutral-700/80 shadow-sm ring-1 ring-black/[0.02] dark:ring-white/[0.03]',
    inputBg: 'bg-white dark:bg-neutral-800',
    inputBorder: 'border-gray-200 dark:border-neutral-700',
    inputText: 'text-gray-800 dark:text-gray-200',
    inputPlaceholder: 'placeholder-gray-400',
    sendButtonBg: 'bg-orange-400 hover:bg-orange-500 dark:bg-orange-400 dark:hover:bg-orange-500',
    sendButtonText: 'text-white',
};

const buildSystemPrompt = (ragContext) => `You are Neo on Choch Kimhour's portfolio. Answer directly and concisely in the first sentence. No search talk, no source lists, no chain-of-thought. Light markdown only when useful.

About Choch: use the portfolio context below; if missing, say you don't have that detail. For general questions, answer helpfully.

Portfolio context:
${ragContext}`;

/**
 * Stream OpenAI-compatible SSE chat completions.
 * Prefer `delta.content` (final answer). Reasoning deltas are ignored for display
 * so the UI is not stuck printing long hidden thinking.
 */
const streamChatCompletion = async ({ apiKey, body, onDelta, signal }) => {
    const response = await fetch(AI_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
            Accept: 'text/event-stream',
        },
        body: JSON.stringify({ ...body, stream: true }),
        signal,
    });

    if (!response.ok) {
        let message = `HTTP ${response.status}`;
        try {
            const err = await response.json();
            message = err.error?.message || message;
        } catch {
            // ignore parse errors
        }
        throw new Error(message);
    }

    // Some proxies still return JSON even when stream:true
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json') && !contentType.includes('event-stream')) {
        const data = await response.json();
        const text = extractAssistantContent(data.choices?.[0]?.message);
        if (text) onDelta(text);
        return text;
    }

    if (!response.body) {
        throw new Error('Streaming is not supported in this browser.');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let content = '';
    let reasoningFallback = '';

    const handlePayload = (payload) => {
        if (!payload || payload === '[DONE]') return;
        let parsed;
        try {
            parsed = JSON.parse(payload);
        } catch {
            return;
        }

        const delta = parsed.choices?.[0]?.delta;
        if (!delta) return;

        if (typeof delta.content === 'string' && delta.content) {
            content += delta.content;
            onDelta(content);
            return;
        }

        // Collect reasoning only as emergency fallback if content never arrives
        for (const key of ['reasoning', 'reasoning_content']) {
            if (typeof delta[key] === 'string' && delta[key]) {
                reasoningFallback += delta[key];
            }
        }
    };

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split('\n');
        buffer = parts.pop() ?? '';

        for (const rawLine of parts) {
            const line = rawLine.trim();
            if (!line || line.startsWith(':')) continue;
            if (line.startsWith('data:')) {
                handlePayload(line.slice(5).trim());
            }
        }
    }

    if (buffer.trim().startsWith('data:')) {
        handlePayload(buffer.trim().slice(5).trim());
    }

    const finalText = content.trim() || reasoningFallback.trim();
    if (finalText && finalText !== content) {
        onDelta(finalText);
    }
    return finalText;
};

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content:
                "Hi! I'm Neo. Ask me anything — general questions, coding help, or live web info. How can I help?",
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const ragContextRef = useRef(null);
    const abortRef = useRef(null);
    const scrollRafRef = useRef(0);

    if (ragContextRef.current === null) {
        ragContextRef.current = getRagContext();
    }

    const AI_API_KEY = (import.meta.env.VITE_AI_API_KEY || '').trim();
    const hasApiKey =
        Boolean(AI_API_KEY) &&
        !AI_API_KEY.includes('your_ai_api_key') &&
        AI_API_KEY !== 'undefined';

    const scrollToBottom = useCallback((smooth = true) => {
        messagesEndRef.current?.scrollIntoView({
            behavior: smooth ? 'smooth' : 'auto',
            block: 'end',
        });
    }, []);

    useEffect(() => {
        // During streaming, use instant scroll to avoid jank
        scrollToBottom(!isStreaming);
    }, [messages, isLoading, isStreaming, scrollToBottom]);

    useEffect(() => {
        return () => {
            abortRef.current?.abort();
            if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
        };
    }, []);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    // Keep single-line inputs scrollbar-free; only scroll when text exceeds max height
    const resizeInput = useCallback((el) => {
        if (!el) return;
        el.style.height = 'auto';
        const max = 100;
        const next = Math.min(el.scrollHeight, max);
        el.style.height = `${next}px`;
        el.style.overflowY = el.scrollHeight > max ? 'auto' : 'hidden';
    }, []);

    useEffect(() => {
        resizeInput(inputRef.current);
    }, [input, resizeInput]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userText = input.trim();
        const userMessage = { role: 'user', content: userText };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setIsStreaming(false);

        if (!hasApiKey) {
            setMessages((prev) => [...prev, {
                role: 'assistant',
                content: 'Chat is not configured. For local dev, set `VITE_AI_API_KEY` in your private `.env`. For GitHub Pages, add the same name as a repository Actions secret, then redeploy.'
            }]);
            setIsLoading(false);
            return;
        }

        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        // Placeholder bubble so streaming text appears immediately
        setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

        try {
            // Skip the canned welcome line; keep only recent turns to cut prompt size
            const conversationHistory = messages
                .filter((m, index) =>
                    index > 0 &&
                    (m.role === 'user' || m.role === 'assistant') &&
                    typeof m.content === 'string' &&
                    m.content.trim()
                )
                .slice(-MAX_HISTORY_MESSAGES)
                .map((m) => ({ role: m.role, content: m.content }));

            const apiMessages = [
                {
                    role: 'system',
                    content: buildSystemPrompt(ragContextRef.current),
                },
                ...conversationHistory,
                { role: 'user', content: userText },
            ];

            let lastFlush = '';
            let pending = '';
            const flushStream = (text) => {
                pending = text;
                if (scrollRafRef.current) return;
                scrollRafRef.current = requestAnimationFrame(() => {
                    scrollRafRef.current = 0;
                    if (pending === lastFlush) return;
                    lastFlush = pending;
                    setIsStreaming(true);
                    setIsLoading(false);
                    setMessages((prev) => {
                        const next = [...prev];
                        const last = next[next.length - 1];
                        if (last?.role === 'assistant') {
                            next[next.length - 1] = { ...last, content: lastFlush };
                        }
                        return next;
                    });
                });
            };

            const content = await streamChatCompletion({
                apiKey: AI_API_KEY,
                signal: controller.signal,
                body: {
                    model: BASE_MODEL,
                    messages: apiMessages,
                    temperature: 0.5,
                    max_tokens: MAX_COMPLETION_TOKENS,
                    // Reduce hidden long thinking when the gateway supports it
                    enable_thinking: false,
                    thinking: { type: 'disabled' },
                },
                onDelta: flushStream,
            });

            if (scrollRafRef.current) {
                cancelAnimationFrame(scrollRafRef.current);
                scrollRafRef.current = 0;
            }

            if (!content?.trim()) {
                throw new Error('Neo got an empty reply from the model. Please try again in a moment.');
            }

            setMessages((prev) => {
                const next = [...prev];
                const last = next[next.length - 1];
                if (last?.role === 'assistant') {
                    next[next.length - 1] = { ...last, content: content.trim() };
                }
                return next;
            });
        } catch (error) {
            if (error?.name === 'AbortError') return;
            console.error('Chat error:', error);
            setMessages((prev) => {
                const next = [...prev];
                const last = next[next.length - 1];
                const errText = `Error: ${error.message}. Please check your internet connection, API credits, or try again later.`;
                if (last?.role === 'assistant' && !last.content) {
                    next[next.length - 1] = { role: 'assistant', content: errText };
                    return next;
                }
                return [...next, { role: 'assistant', content: errText }];
            });
        } finally {
            setIsLoading(false);
            setIsStreaming(false);
        }
    };

    return (
        <div
            className="fixed z-50 bottom-4 right-4 sm:bottom-6 sm:right-6"
            style={{
                // Keep clear of iPhone home indicator / notched edges
                marginBottom: 'env(safe-area-inset-bottom, 0px)',
                marginRight: 'env(safe-area-inset-right, 0px)',
            }}
        >
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl shadow-lg flex items-center justify-center touch-manipulation transition-[transform,box-shadow,background-color] duration-300 ease-out ${isOpen
                        ? `${theme.closeButtonBg} rotate-90`
                        : `${theme.buttonBg} hover:shadow-xl sm:hover:scale-105`
                    } ${theme.buttonText}`}
                aria-label={isOpen ? 'Close Neo' : 'Open Neo'}
                aria-expanded={isOpen}
            >
                {isOpen ? (
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z" />
                    </svg>
                )}
            </button>

            <div
                className={`absolute bottom-[3.5rem] sm:bottom-20 right-0 flex flex-col rounded-2xl shadow-2xl overflow-hidden transition-[opacity,transform] duration-300 ease-out ${isOpen
                        ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                        : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
                    } ${theme.windowBg} ${theme.windowBorder}`}
                style={{
                    // Fit any phone width (320px+) without clipping; cap on larger screens
                    width: 'min(24rem, calc(100vw - 2rem))',
                    // Never taller than the visible viewport (short phones / landscape)
                    height: 'min(34.375rem, calc(100dvh - 5.5rem - env(safe-area-inset-bottom, 0px)))',
                    maxHeight: 'calc(100dvh - 5.5rem - env(safe-area-inset-bottom, 0px))',
                    transformOrigin: 'bottom right',
                }}
                role="dialog"
                aria-label="Neo chat"
                aria-hidden={!isOpen}
            >
                <div className={`${theme.headerBg} px-3 py-3 sm:p-4 flex-shrink-0`}>
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 dark:text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z" />
                            </svg>
                        </div>
                        <div className="min-w-0">
                            <h3 className={`${theme.headerText} font-semibold text-sm sm:text-base`}>Neo</h3>
                            <p className={`${theme.headerSubtext} text-[11px] sm:text-xs truncate`}>Powered by AI</p>
                        </div>
                    </div>
                </div>

                <div
                    className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3 sm:p-4 space-y-3 sm:space-y-4"
                    style={{ WebkitOverflowScrolling: 'touch' }}
                >
                    {messages.map((msg, index) => {
                        const isLastAssistant =
                            msg.role === 'assistant' && index === messages.length - 1;
                        const showTyping = isLastAssistant && isLoading && !msg.content;
                        const showCursor = isLastAssistant && isStreaming && msg.content;

                        return (
                            <div
                                key={index}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[85%] sm:max-w-[80%] px-3 py-2 sm:px-4 sm:py-2.5 text-[13px] sm:text-sm leading-relaxed break-words [overflow-wrap:anywhere] chat-msg-in ${msg.role === 'user'
                                        ? `${theme.userMsgBg} ${theme.userMsgText} rounded-2xl rounded-br-md shadow-sm chat-msg-in-user whitespace-pre-wrap`
                                        : `${theme.botMsgBg} ${theme.botMsgText} rounded-2xl rounded-bl-md ${theme.botMsgBorder}`
                                    }`}>
                                    {msg.role === 'assistant' ? (
                                        showTyping ? (
                                            <TypingIndicator label="Typing..." />
                                        ) : (
                                            <>
                                                <MarkdownMessage content={msg.content || ' '} />
                                                {showCursor && (
                                                    <span className="inline-block w-1.5 h-3.5 ml-0.5 align-middle bg-orange-400/80 animate-pulse" aria-hidden />
                                                )}
                                            </>
                                        )
                                    ) : (
                                        msg.content
                                    )}
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>

                <form
                    onSubmit={sendMessage}
                    className={`p-3 sm:p-4 border-t flex-shrink-0 ${theme.inputBorder} ${theme.inputBg}`}
                >
                    <div className="flex items-end gap-2">
                        <div className="flex-1 min-w-0 relative flex">
                            <textarea
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    // Desktop: Enter sends. Mobile soft keyboards often use Enter for newline — leave as-is.
                                    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                                        // Avoid accidental send on some mobile keyboards that fire Enter
                                        if (window.matchMedia('(pointer: coarse)').matches) return;
                                        e.preventDefault();
                                        sendMessage(e);
                                    }
                                }}
                                placeholder="Ask anything"
                                rows={1}
                                enterKeyHint="send"
                                className={`block w-full min-h-11 max-h-[100px] px-3 sm:px-4 py-2.5 rounded-xl text-base sm:text-sm resize-none leading-5 align-middle box-border overflow-y-hidden bg-white dark:bg-neutral-950 border-2 border-gray-300 dark:border-neutral-500 shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 hover:border-gray-400 dark:hover:border-neutral-400 focus:outline-none focus:border-orange-400 dark:focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 transition-[border-color,box-shadow] duration-150 disabled:opacity-60 ${theme.inputText}`}
                                disabled={isLoading}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className={`flex-shrink-0 w-11 h-11 rounded-xl touch-manipulation disabled:opacity-40 disabled:cursor-not-allowed transition-[box-shadow,background-color,opacity] duration-200 shadow-md hover:shadow-lg flex items-center justify-center ${theme.sendButtonBg} ${theme.sendButtonText}`}
                            aria-label="Send message"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M3.4 20.4l17.45-7.48a1 1 0 000-1.84L3.4 3.6a.993.993 0 00-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChatBot;
