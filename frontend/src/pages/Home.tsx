
import React, { useState, useEffect } from 'react';
import { Send, Copy, Sparkles } from 'lucide-react';
import { useApi } from '../api/client';

export const Home: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: "Hi! I'm your Profile Optimizer agent. Share a LinkedIn URL or ask me how to improve your profile." }
  ]);
  const [completeness, setCompleteness] = useState(0);
  const api = useApi();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.post('/profile/evaluate');
        setCompleteness(res.data.completeness_score);
      } catch (e) {
        console.error("Failed to fetch profile", e);
      }
    };
    fetchProfile();
  }, [api]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);

    try {
      const res = await api.post('/chat', {
        message: userMsg,
        session_id: "demo-session" // TODO: Generate real session ID
      });

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: res.data.response
      }]);
    } catch (e) {
      console.error("Chat error", e);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I encountered an error. Please try again."
      }]);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left: Profile Health / Context */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            Profile Health
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Completeness</span>
                <span className="font-medium text-indigo-600">{completeness}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${completeness}%` }}></div>
              </div>
            </div>
            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
              <p className="text-sm text-indigo-800 font-medium">Suggestion</p>
              <p className="text-sm text-indigo-600 mt-1">Add your "Current Focus" to help others find you.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Chat Interface */}
      <div className="lg:col-span-2 h-[600px] flex flex-col bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl p-4 ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}>
                <p className="leading-relaxed">{msg.content}</p>
                {msg.role === 'assistant' && idx > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200/20 flex gap-2">
                    <button className="text-xs flex items-center gap-1 hover:text-indigo-500 transition-colors">
                      <Copy className="w-3 h-3" /> Copy Suggestion
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message or paste a URL..."
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white shadow-sm"
            />
            <button
              onClick={handleSend}
              className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!input.trim()}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
