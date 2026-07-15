import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { getRagContext } from '../utils/ragContext';

const TypingIndicator = () => (
    <div className="flex items-center gap-1.5 px-4 py-3">
        <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400 animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1s' }}></div>
        <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400 animate-bounce" style={{ animationDelay: '200ms', animationDuration: '1s' }}></div>
        <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400 animate-bounce" style={{ animationDelay: '400ms', animationDuration: '1s' }}></div>
        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 italic">Typing...</span>
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

const MarkdownMessage = ({ content }) => (
    <div className="chat-markdown break-words">
        <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
    </div>
);

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi! I\'m your AI assistant. Ask me anything with any general question you have. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [typingMessage, setTypingMessage] = useState(null);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const typingTimerRef = useRef(null);

    const OPENROUTER_API_KEY = (import.meta.env.VITE_OPENROUTER_API_KEY || '').trim();
    const hasApiKey =
        Boolean(OPENROUTER_API_KEY) &&
        !OPENROUTER_API_KEY.includes('your_openrouter_api_key') &&
        OPENROUTER_API_KEY !== 'undefined';
    const ragContext = getRagContext();

    const clearTypingTimer = () => {
        if (typingTimerRef.current) {
            clearInterval(typingTimerRef.current);
            typingTimerRef.current = null;
        }
    };

    const startTypingEffect = (content) => {
        clearTypingTimer();
        setTypingMessage('');
        setIsLoading(false);

        let index = 0;
        // Longer replies type a few chars at a time so it stays snappy
        const charsPerTick = content.length > 500 ? 5 : content.length > 200 ? 3 : 1;
        const speed = 16;

        typingTimerRef.current = setInterval(() => {
            index = Math.min(index + charsPerTick, content.length);
            setTypingMessage(content.slice(0, index));

            if (index >= content.length) {
                clearTypingTimer();
                setTypingMessage(null);
                setMessages((prev) => [...prev, { role: 'assistant', content }]);
            }
        }, speed);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, typingMessage]);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    useEffect(() => () => clearTypingTimer(), []);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading || typingMessage !== null) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        if (!hasApiKey) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Chat is not configured. For local dev, set `VITE_OPENROUTER_API_KEY` in your private `.env`. For GitHub Pages, add the same name as a repository Actions secret, then redeploy.'
            }]);
            setIsLoading(false);
            return;
        }

        try {
            const conversationHistory = messages
                .filter(m => m.role === 'user' || m.role === 'assistant')
                .map(m => ({ role: m.role, content: m.content }));

            const apiMessages = [
                {
                    role: 'system',
                    content: `You are a helpful, friendly, and knowledgeable AI assistant on Choch Kimhour's portfolio website. You can answer ANY question the user asks — general knowledge, coding help, explanations, creative writing, math, advice, etc. — just like ChatGPT.

                    When the user asks something about Choch Kimhour (his skills, projects, experience, background, education, contact info, etc.), use the context below to answer accurately. If the question is about Choch but the answer is not in the context, say you don't have that specific info and suggest they contact him directly.

                    For all other questions unrelated to Choch, answer freely using your general knowledge. Be concise, clear, and friendly. Use clean markdown when helpful (bold, bullet lists, short sections). Prefer simple structure over heavy formatting.

                    ---
                    Context about Choch Kimhour:
                    ${ragContext}
                    ---`
                },
                ...conversationHistory,
                { role: 'user', content: input }
            ];

            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'HTTP-Referer': window.location.origin,
                    'X-Title': 'Choch Kimhour Portfolio'
                },
                body: JSON.stringify({
                    model: 'openai/gpt-oss-20b:free',
                    messages: apiMessages,
                    temperature: 0.7,
                    max_tokens: 1024
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('API Error:', data);
                throw new Error(data.error?.message || `HTTP ${response.status}`);
            }

            if (data.choices && data.choices[0] && data.choices[0].message) {
                const content = data.choices[0].message.content ?? '';
                startTypingEffect(content);
            } else {
                throw new Error('Unexpected API response structure');
            }
        } catch (error) {
            console.error('Chat error:', error);
            clearTypingTimer();
            setTypingMessage(null);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: `Error: ${error.message}. Please check your internet connection or try again later.`
            }]);
            setIsLoading(false);
        }
    };

    // Get theme colors based on current mode
    const getThemeColors = () => {
        return {
            // Button colors
            buttonBg: 'bg-orange-400 hover:bg-orange-500',
            buttonText: 'text-white',
            closeButtonBg: 'bg-orange-500 hover:bg-orange-600',

            // Chat window
            windowBg: 'bg-gray-50 dark:bg-neutral-900',
            windowBorder: 'border border-gray-200 dark:border-neutral-700',

            // Header (white-gray)
            headerBg: 'bg-gray-200 dark:bg-neutral-700',
            headerText: 'text-gray-800 dark:text-gray-100',
            headerSubtext: 'text-gray-500 dark:text-gray-400',

            // Messages
            userMsgBg: 'bg-gray-700 dark:bg-gray-300',
            userMsgText: 'text-white dark:text-gray-900',
            botMsgBg: 'bg-white dark:bg-neutral-800',
            botMsgText: 'text-gray-800 dark:text-gray-200',
            botMsgBorder: 'border border-gray-200/80 dark:border-neutral-700/80 shadow-sm ring-1 ring-black/[0.02] dark:ring-white/[0.03]',

            // Input
            inputBg: 'bg-white dark:bg-neutral-800',
            inputBorder: 'border-gray-200 dark:border-neutral-700',
            inputText: 'text-gray-800 dark:text-gray-200',
            inputPlaceholder: 'placeholder-gray-400',

            // Send button (matches header white-gray)
            sendButtonBg: 'bg-gray-200 hover:bg-gray-300 dark:bg-neutral-700 dark:hover:bg-neutral-600',
            sendButtonText: 'text-gray-700 dark:text-gray-100',
        };
    };

    const theme = getThemeColors();

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Chat Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center ${
                    isOpen
                        ? `${theme.closeButtonBg} rotate-90`
                        : `${theme.buttonBg} hover:shadow-xl hover:scale-105`
                } ${theme.buttonText}`}
                style={{
                    transitionProperty: 'transform, box-shadow, background-color',
                    transitionDuration: '320ms',
                    transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                    willChange: 'transform',
                }}
                aria-label={isOpen ? 'Close chat' : 'Open chat'}
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

            {/* Chat Window */}
            <div
                className={`absolute bottom-20 right-0 w-80 md:w-96 rounded-2xl shadow-2xl overflow-hidden ${
                    isOpen
                        ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                        : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
                } ${theme.windowBg} ${theme.windowBorder} flex flex-col`}
                style={{
                    height: '550px',
                    transformOrigin: 'bottom right',
                    transitionProperty: 'opacity, transform',
                    transitionDuration: isOpen ? '360ms' : '220ms',
                    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                    willChange: 'opacity, transform',
                }}
            >
                {/* Header */}
                <div className={`${theme.headerBg} p-4 flex-shrink-0`}>
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center`}>
                            <svg className={`w-6 h-6 text-orange-400 dark:text-orange-300`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className={`${theme.headerText} font-semibold`}>AI Assistant</h3>
                            <p className={`${theme.headerSubtext} text-xs`}>Powered by OpenRouter</p>
                        </div>
                    </div>
                </div>

                {/* Messages */}
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

                    {/* Live typing (plain text while streaming in; markdown applied when finished) */}
                    {typingMessage !== null && (
                        <div className="flex justify-start">
                            <div className={`max-w-[80%] w-fit ${theme.botMsgBg} rounded-2xl rounded-bl-md ${theme.botMsgBorder} chat-msg-in`}>
                                <div className="px-4 py-2.5 text-sm leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words">
                                    {typingMessage}
                                    <span className="inline-block w-0.5 h-4 bg-gray-400 animate-pulse ml-0.5 align-middle"></span>
                                </div>
                            </div>
                        </div>
                    )}

                    {isLoading && typingMessage === null && (
                        <div className="flex justify-start">
                            <div className={`max-w-[80%] ${theme.botMsgBg} rounded-2xl rounded-bl-md ${theme.botMsgBorder} chat-msg-in`}>
                                <TypingIndicator />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
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
                                placeholder="Ask me anything..."
                                rows={1}
                                className={`block w-full h-11 px-4 py-3 bg-gray-100 dark:bg-neutral-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none leading-5 border-0 align-middle box-border ${theme.inputText} ${theme.inputPlaceholder}`}
                                style={{ maxHeight: '100px' }}
                                disabled={isLoading || typingMessage !== null}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading || typingMessage !== null || !input.trim()}
                            className={`flex-shrink-0 w-11 h-11 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center ${theme.sendButtonBg} ${theme.sendButtonText}`}
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