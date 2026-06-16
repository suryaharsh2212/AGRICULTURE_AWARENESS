import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, Bot, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
const ChatMessage = ({ message }) => {
  const [showSources, setShowSources] = useState(false);
  const isUser = message.sender === 'user';

  return (
    <div className={`flex flex-col mb-4 ${isUser ? 'items-end' : 'items-start'}`}>
      <div className={`flex items-start max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-green-600 ml-2' : 'bg-green-100 mr-2'}`}>
          {isUser ? <User size={16} className="text-white" /> : <Bot size={16} className="text-green-700" />}
        </div>
        
        <div className={`p-3 rounded-2xl ${
          isUser 
            ? 'bg-green-600 text-white rounded-tr-none' 
            : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
        }`}>
          <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.text}</div>
          
          {!isUser && message.sources && message.sources.length > 0 && (
            <div className="mt-3 pt-2 border-t border-gray-200/60">
              <button 
                onClick={() => setShowSources(!showSources)}
                className="flex items-center text-xs text-green-700 hover:text-green-800 font-medium"
              >
                {showSources ? <ChevronUp size={14} className="mr-1" /> : <ChevronDown size={14} className="mr-1" />}
                {showSources ? 'Hide Sources' : 'View Sources'}
              </button>
              
              {showSources && (
                <div className="mt-2 space-y-1.5">
                  {message.sources.map((source, idx) => (
                    <div key={idx} className="text-xs bg-green-50/50 p-2 rounded border border-green-100">
                      <span className="font-semibold text-green-800">{source.category || source.sourceModel}:</span> {source.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm AgriBot, your agriculture assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Use the actual backend API URL. Make sure it's correct.
      // We will assume backend is running on http://localhost:5000 in dev
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage.text })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: data.answer,
        sender: 'bot',
        sources: data.sources
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again later.",
        sender: 'bot'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-gray-50 rounded-2xl shadow-2xl w-[380px] max-w-[calc(100vw-32px)] h-[550px] max-h-[calc(100vh-100px)] mb-4 flex flex-col overflow-hidden border border-gray-200 transition-all duration-300 origin-bottom-right">
          {/* Header */}
          <div className="bg-green-600 text-white p-4 flex justify-between items-center shrink-0 shadow-sm relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                <Bot size={22} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg leading-tight">AgriBot</h3>
                <p className="text-green-100 text-xs flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse"></span>
                  Online
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-gray-50">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            
            {isLoading && (
              <div className="flex items-start max-w-[80%]">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 mr-2 flex items-center justify-center">
                  <Bot size={16} className="text-green-700" />
                </div>
                <div className="bg-white border border-gray-200 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100 shrink-0">
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about crops, soil, etc..."
                className="flex-1 border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm bg-gray-50"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-green-600 text-white rounded-full p-3 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md flex-shrink-0 flex items-center justify-center min-w-[48px]"
              >
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} className="ml-0.5" />}
              </button>
            </form>
            <div className="text-center mt-2">
              <span className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">AI-Powered Agriculture Assistant</span>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-green-600 text-white p-4 rounded-full shadow-2xl hover:bg-green-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center ${isOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}
        style={{ position: isOpen ? 'absolute' : 'relative', bottom: isOpen ? '-100px' : '0' }}
      >
        <MessageSquare size={28} />
      </button>
      
      {/* Absolute close button that swaps in when open */}
      <button
        onClick={() => setIsOpen(false)}
        className={`bg-gray-800 text-white p-4 rounded-full shadow-2xl hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 flex items-center justify-center ${!isOpen ? '-rotate-90 scale-0 opacity-0 pointer-events-none' : 'rotate-0 scale-100 opacity-100'}`}
        style={{ position: !isOpen ? 'absolute' : 'relative' }}
      >
        <X size={28} />
      </button>
    </div>
  );
};

export default ChatbotWidget;
