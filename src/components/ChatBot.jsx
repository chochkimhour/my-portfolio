import { useState, useRef, useEffect } from 'react';
import { getRagContext } from '../utils/ragContext';

const TypingIndicator = () => (
    <div className="flex items-center gap-1.5 px-4 py-3">
        <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400 animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1s' }}></div>
        <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400 animate-bounce" style={{ animationDelay: '200ms', animationDuration: '1s' }}></div>
        <div className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400 animate-bounce" style={{ animationDelay: '400ms', animationDuration: '1s' }}></div>
        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 italic">Typing...</span>
    </div>
);

const TypewriterText = ({ text, onComplete }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(text.substring(0, currentIndex + 1));
                setCurrentIndex(prev => prev + 1);
            }, 15);
            return () => clearTimeout(timeout);
        } else {
            onComplete?.();
        }
    }, [currentIndex, text, onComplete]);

    return <span>{displayedText}</span>;
};

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

    const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
    const ragContext = getRagContext();

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

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const conversationHistory = messages
                .filter(m => m.role === 'user' || m.role === 'assistant')
                .map(m => ({ role: m.role, content: m.content }));

            const apiMessages = [
                {
                    role: 'system',
                    content: `You are a helpful, friendly, and knowledgeable AI assistant on Choch Kimhour's portfolio website. You can answer ANY question the user asks — general knowledge, coding help, explanations, creative writing, math, advice, etc. — just like ChatGPT.

                    When the user asks something about Choch Kimhour (his skills, projects, experience, background, education, contact info, etc.), use the context below to answer accurately. If the question is about Choch but the answer is not in the context, say you don't have that specific info and suggest they contact him directly.

                    For all other questions unrelated to Choch, answer freely using your general knowledge. Be concise, clear, and friendly. Use markdown formatting (code blocks, lists, bold) when it helps readability.

                    ---
                    Context about Choch Kimhour:
                    ${ragContext}
                    ---`
                },
                ...conversationHistory,
                { role: 'user', content: input }
            ];

            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${GROQ_API_KEY}`
                },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
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
                const content = data.choices[0].message.content;
                setTypingMessage(content);
                setIsLoading(false);

                // Simulate typing effect
                let index = 0;
                const speed = 30;
                const timer = setInterval(() => {
                    index++;
                    if (index >= content.length) {
                        clearInterval(timer);
                        setTypingMessage(null);
                        setMessages(prev => [...prev, { role: 'assistant', content }]);
                    }
                }, speed);
            } else {
                throw new Error('Unexpected API response structure');
            }
        } catch (error) {
            console.error('Chat error:', error);
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
                            <p className={`${theme.headerSubtext} text-xs`}>Powered by Groq</p>
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
                            <div className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words chat-msg-in ${
                                msg.role === 'user'
                                    ? `${theme.userMsgBg} ${theme.userMsgText} rounded-2xl rounded-br-md shadow-sm chat-msg-in-user`
                                    : `${theme.botMsgBg} ${theme.botMsgText} rounded-2xl rounded-bl-md ${theme.botMsgBorder}`
                            }`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}

                    {/* Typing animation */}
                    {typingMessage && (
                        <div className="flex justify-start">
                            <div className={`max-w-[80%] w-fit ${theme.botMsgBg} rounded-2xl rounded-bl-md ${theme.botMsgBorder} chat-msg-in`}>
                                <div className="px-4 py-2.5 text-sm leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words">
                                    {typingMessage}
                                    <span className="inline-block w-0.5 h-4 bg-gray-400 animate-pulse ml-0.5 align-middle"></span>
                                </div>
                            </div>
                        </div>
                    )}

                    {isLoading && !typingMessage && (
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
                                disabled={isLoading}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
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