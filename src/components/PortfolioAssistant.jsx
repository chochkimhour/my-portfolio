import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getBotResponse } from '../utils/botLogic';
import { PERSONAL_INFO, UI_TEXT } from '../constants';

const Typewriter = ({ text, onComplete }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[index]);
                setIndex(prev => prev + 1);
            }, 20); // Faster typing speed
            return () => clearTimeout(timeout);
        } else if (onComplete) {
            onComplete();
        }
    }, [index, text, onComplete]);

    return <span>{displayedText}</span>;
};

const PortfolioAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: UI_TEXT.bot.welcome_message(PERSONAL_INFO.name), sender: 'bot', isComplete: true }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);
    const inputRef = useRef('');

    const SUGGESTED_QUESTIONS = UI_TEXT.bot.suggested_questions;

    // Update ref whenever input changes
    useEffect(() => {
        inputRef.current = input;
    }, [input]);

    const scrollToBottom = useCallback((behavior = 'smooth') => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior
            });
        }
    }, []);

    const handleSend = useCallback((e, textOverride = null) => {
        if (e) e.preventDefault();
        const finalInput = textOverride || inputRef.current;
        if (!finalInput.trim()) return;

        const userMsg = finalInput.trim();
        setMessages(prev => [...prev, { id: Date.now(), text: userMsg, sender: 'user', isComplete: true }]);
        setInput('');
        setIsTyping(true);

        const delay = Math.min(800, userMsg.length * 10);
        setTimeout(() => {
            const botResponse = getBotResponse(userMsg);
            setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot', isComplete: false }]);
            setIsTyping(false);
        }, delay);
    }, []); // Stabilized handleSend

    useEffect(() => {
        const handleGreet = () => {
            setIsOpen(true);
            handleSend(null, "Hi! 👋");
        };
        window.addEventListener('greet-bot', handleGreet);
        return () => window.removeEventListener('greet-bot', handleGreet);
    }, [handleSend]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, scrollToBottom]);

    const markMessageComplete = (id) => {
        setMessages(prev => prev.map(m => m.id === id ? { ...m, isComplete: true } : m));
        // Force scroll one last time after typing completes
        setTimeout(scrollToBottom, 50);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] font-sans">
            {/* 🛸 Premium Floating Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-tr from-amber-600 to-amber-400 text-white rounded-full shadow-[0_10px_30px_rgba(217,119,6,0.4)] flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 group relative ring-4 ring-white/10"
                >
                    <div className="absolute inset-0 rounded-full bg-amber-500 animate-ping opacity-20 group-hover:opacity-40"></div>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 sm:w-9 sm:h-9 group-hover:rotate-12 transition-transform relative z-10 drop-shadow-sm">
                        <path d="M12 4C7.58172 4 4 7.58172 4 12C4 13.9169 4.66597 15.6791 5.77661 17.0658L4.6658 20.3982L7.99824 19.2874C9.18312 19.7437 10.5186 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="9" cy="11.5" r="1.2" fill="white"/>
                        <circle cx="15" cy="11.5" r="1.2" fill="white"/>
                        <path d="M9 14.5C9.5 15.5 10.5 16.5 12 16.5C13.5 16.5 14.5 15.5 15 14.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </button>
            )}

            {/* 💎 Glassmorphism Chat Window */}
            {isOpen && (
                <div className="w-[300px] sm:w-[380px] h-[500px] bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_40px_120px_rgba(0,0,0,0.4)] border border-gray-200 dark:border-white/20 flex flex-col overflow-hidden animate-fade-in-up">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-amber-600 to-amber-500 p-6 text-white flex items-center justify-between shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 blur-3xl"></div>
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl shadow-inner animate-float">
                                🤖
                            </div>
                            <div>
                                <h4 className="font-bold text-lg leading-tight tracking-tight">{UI_TEXT.bot.assistant_name}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.8)]"></span>
                                    <p className="text-[9px] uppercase tracking-[0.25em] font-black opacity-90">{UI_TEXT.bot.active_status}</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-10 h-10 flex items-center justify-center bg-black/10 hover:bg-black/20 rounded-full transition-all active:scale-90 relative z-20"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-5 space-y-5 bg-gray-50/30 dark:bg-transparent scroll-smooth"
                    >
                        {messages.map((m) => (
                            <div
                                key={m.id}
                                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
                            >
                                <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-[13px] leading-relaxed shadow-sm transition-all duration-300 ${m.sender === 'user'
                                    ? 'bg-amber-600 text-white rounded-tr-none shadow-amber-200/20'
                                    : 'bg-white dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700/50 rounded-tl-none'
                                    }`}>
                                    {m.sender === 'bot' && !m.isComplete ? (
                                        <Typewriter text={m.text} onComplete={() => markMessageComplete(m.id)} />
                                    ) : (
                                        m.text
                                    )}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-gray-800/80 px-5 py-4 rounded-2xl rounded-tl-none border border-gray-100 dark:border-gray-700/50 shadow-sm">
                                    <div className="flex gap-2">
                                        <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce [animation-duration:0.8s]"></div>
                                        <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.2s]"></div>
                                        <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.4s]"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer Container */}
                    <div className="bg-white/70 dark:bg-black/20 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800/50 p-4 space-y-4">
                        {/* Suggested Chips */}
                        <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto pr-1 custom-scrollbar">
                            {SUGGESTED_QUESTIONS.map((q) => (
                                <button
                                    key={q}
                                    onClick={() => handleSend(null, q)}
                                    className="text-[10px] font-bold px-4 py-2 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30 rounded-full hover:bg-amber-600 hover:text-white transition-all transform hover:-translate-y-0.5 active:scale-95 whitespace-nowrap"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>

                        {/* Input Area */}
                        <form
                            onSubmit={handleSend}
                            className="relative flex items-center group"
                        >
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={UI_TEXT.bot.placeholder(PERSONAL_INFO.name)}
                                className="w-full bg-gray-100/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-2xl pl-5 pr-14 py-4 text-[13px] focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all dark:text-white placeholder:text-gray-400 font-medium"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 w-10 h-10 bg-amber-600 text-white rounded-xl flex items-center justify-center hover:bg-amber-500 transition-all shadow-lg active:scale-90 disabled:opacity-50"
                                disabled={!input.trim() || isTyping}
                            >
                                <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PortfolioAssistant;
