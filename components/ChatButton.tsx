
import React, { useState } from 'react';

const ChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to HAIRFORCE support! How can we help you find the right barber today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages([...messages, { id: Date.now(), text: input, sender: 'user' }]);
    setInput('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, text: "Thanks for reaching out! A team member will respond shortly.", sender: 'bot' }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {isOpen ? (
        <div className="bg-white w-80 md:w-[380px] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-fade-in border border-slate-200">
          <div className="bg-blue-600 p-6 flex justify-between items-center">
            <div className="flex items-center space-x-4 text-white">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <i className="fas fa-headset text-white text-xl"></i>
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-tight">Support Chat</h4>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  <p className="text-[10px] text-blue-100 uppercase font-bold">Always Online</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <div className="flex-grow h-[400px] overflow-y-auto p-6 space-y-4 bg-slate-50">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-xl text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex space-x-2">
            <input 
              type="text" 
              placeholder="How can we help?"
              className="flex-grow p-3 rounded bg-slate-100 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 text-xs font-medium"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="w-10 h-10 bg-blue-600 text-white rounded flex items-center justify-center shadow hover:bg-blue-700 transition-all active:scale-90">
              <i className="fas fa-paper-plane text-sm"></i>
            </button>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-blue-600 text-white rounded-full shadow-xl flex items-center justify-center transform hover:scale-105 active:scale-95 transition-all group"
        >
          <i className="fas fa-comment-dots text-2xl"></i>
        </button>
      )}
    </div>
  );
};

export default ChatButton;
