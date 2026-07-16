import { useState, useRef, useEffect, useCallback, memo } from 'react';
import ReactMarkdown from 'react-markdown';
import { getRagContext } from '../utils/ragContext';

const BASE_MODEL =
    (import.meta.env.VITE_OPENROUTER_MODEL || 'openai/gpt-oss-20b:free').trim();

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
    if (typeof message.reasoning === 'string' && message.reasoning.trim()) {
        return message.reasoning.trim();
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

const buildSystemPrompt = (ragContext) => `You are Neo, a helpful, friendly AI on Choch Kimhour's portfolio website.

CORE RULE — JUST ANSWER:
- Give a direct, useful answer in the first sentence. Never stall.
- NEVER say you need to search, browse, look it up, or describe any search process.
- NEVER ask permission to search. Do NOT list sources, citations, or a "Sources" section.
- Answer as a normal assistant: short, clear, friendly.

LIVE WEB (important):
- Fresh web search results are attached to this request automatically. Treat them as your primary source for facts (who built what, releases, news, companies, products, versions, current events).
- When web results are present, prefer them over your training memory — training data is often wrong or outdated.
- Do not invent company names, product ownership, or release details if web results say otherwise.
- If web results are missing or weak, give your best careful answer and say you may be unsure — still answer, never refuse.

About Choch Kimhour only:
- For questions about Choch, use the portfolio context below (not web). If it isn't there, say you don't have that detail.

Style: concise. Light markdown when useful. No fluff.

---
Context about Choch Kimhour:
${ragContext}
---`;

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
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const ragContextRef = useRef(null);

    if (ragContextRef.current === null) {
        ragContextRef.current = getRagContext();
    }

    const OPENROUTER_API_KEY = (import.meta.env.VITE_OPENROUTER_API_KEY || '').trim();
    const hasApiKey =
        Boolean(OPENROUTER_API_KEY) &&
        !OPENROUTER_API_KEY.includes('your_openrouter_api_key') &&
        OPENROUTER_API_KEY !== 'undefined';

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading, scrollToBottom]);

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

        if (!hasApiKey) {
            setMessages((prev) => [...prev, {
                role: 'assistant',
                content: 'Chat is not configured. For local dev, set `VITE_OPENROUTER_API_KEY` in your private `.env`. For GitHub Pages, add the same name as a repository Actions secret, then redeploy.'
            }]);
            setIsLoading(false);
            return;
        }

        try {
            const conversationHistory = messages
                .filter((m) =>
                    (m.role === 'user' || m.role === 'assistant') &&
                    typeof m.content === 'string' &&
                    m.content.trim()
                )
                .map((m) => ({ role: m.role, content: m.content }));

            const apiMessages = [
                {
                    role: 'system',
                    content: buildSystemPrompt(ragContextRef.current),
                },
                ...conversationHistory,
                { role: 'user', content: userText },
            ];

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'HTTP-Referer': window.location.origin,
                'X-Title': 'Choch Kimhour Portfolio',
            };

            const requestCompletion = async (useWeb) => {
                const body = {
                    model: BASE_MODEL,
                    messages: apiMessages,
                    temperature: 0.6,
                    // Reasoning models burn tokens on thinking; leave room for the actual answer
                    max_tokens: 2048,
                    // Prefer a short final answer over long silent reasoning
                    reasoning: { effort: 'low' },
                };

                if (useWeb) {
                    // OpenRouter web plugin (Exa / native search — live results, not a local fact list)
                    body.plugins = [{
                        id: 'web',
                        max_results: 5,
                        search_prompt:
                            'Live web results for this question (use these as the main facts; answer the user directly, do not mention searching):',
                    }];
                }

                const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(body),
                });

                const data = await response.json();

                if (!response.ok) {
                    console.error('API Error:', data);
                    throw new Error(data.error?.message || `HTTP ${response.status}`);
                }

                return data;
            };

            // Try with live web first; if the model returns an empty box, retry without web
            let data = await requestCompletion(true);
            let content = extractAssistantContent(data.choices?.[0]?.message);

            if (!content) {
                console.warn('Empty assistant content with web search; retrying without plugins', data);
                data = await requestCompletion(false);
                content = extractAssistantContent(data.choices?.[0]?.message);
            }

            if (!content) {
                const finish = data.choices?.[0]?.finish_reason;
                throw new Error(
                    finish === 'length'
                        ? 'The model ran out of tokens before writing an answer. Please try a shorter question.'
                        : 'Neo got an empty reply from the model. Please try again in a moment.'
                );
            }

            setMessages((prev) => [...prev, { role: 'assistant', content }]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages((prev) => [...prev, {
                role: 'assistant',
                content: `Error: ${error.message}. Please check your internet connection, OpenRouter credits (web search needs credits even on free models), or try again later.`
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center transition-[transform,box-shadow,background-color] duration-300 ease-out ${
                    isOpen
                        ? `${theme.closeButtonBg} rotate-90`
                        : `${theme.buttonBg} hover:shadow-xl hover:scale-105`
                } ${theme.buttonText}`}
                aria-label={isOpen ? 'Close Neo' : 'Open Neo'}
            >
                {isOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z" />
                    </svg>
                )}
            </button>

            <div
                className={`absolute bottom-20 right-0 w-80 md:w-96 rounded-2xl shadow-2xl overflow-hidden transition-[opacity,transform] duration-300 ease-out ${
                    isOpen
                        ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                        : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
                } ${theme.windowBg} ${theme.windowBorder} flex flex-col`}
                style={{
                    height: '550px',
                    transformOrigin: 'bottom right',
                }}
            >
                <div className={`${theme.headerBg} p-4 flex-shrink-0`}>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center shrink-0">
                            <svg className="w-6 h-6 text-orange-400 dark:text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z" />
                            </svg>
                        </div>
                        <div className="min-w-0">
                            <h3 className={`${theme.headerText} font-semibold`}>Neo</h3>
                            <p className={`${theme.headerSubtext} text-xs`}>Powered by OpenRouter</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed break-words chat-msg-in ${
                                msg.role === 'user'
                                    ? `${theme.userMsgBg} ${theme.userMsgText} rounded-2xl rounded-br-md shadow-sm chat-msg-in-user whitespace-pre-wrap`
                                    : `${theme.botMsgBg} ${theme.botMsgText} rounded-2xl rounded-bl-md ${theme.botMsgBorder}`
                            }`}>
                                {msg.role === 'assistant' ? (
                                    <MarkdownMessage content={msg.content} />
                                ) : (
                                    msg.content
                                )}
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex justify-start">
                            <div className={`max-w-[80%] ${theme.botMsgBg} rounded-2xl rounded-bl-md ${theme.botMsgBorder} chat-msg-in`}>
                                <TypingIndicator label="Thinking..." />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={sendMessage} className={`p-4 border-t flex-shrink-0 ${theme.inputBorder} ${theme.inputBg}`}>
                    <div className="flex items-center gap-2">
                        <div className="flex-1 relative flex">
                            <textarea
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        sendMessage(e);
                                    }
                                }}
                                placeholder="Ask anything"
                                rows={1}
                                className={`block w-full min-h-11 max-h-[100px] px-4 py-2.5 rounded-xl text-sm resize-none leading-5 align-middle box-border overflow-y-hidden bg-white dark:bg-neutral-950 border-2 border-gray-300 dark:border-neutral-500 shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 hover:border-gray-400 dark:hover:border-neutral-400 focus:outline-none focus:border-orange-400 dark:focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 transition-[border-color,box-shadow] duration-150 disabled:opacity-60 ${theme.inputText}`}
                                disabled={isLoading}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className={`flex-shrink-0 w-11 h-11 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-[box-shadow,background-color,opacity] duration-200 shadow-md hover:shadow-lg flex items-center justify-center ${theme.sendButtonBg} ${theme.sendButtonText}`}
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
