import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { MESSAGES } from '../../utils/dummyData';
import toast from 'react-hot-toast';

export default function Messages() {
  const [selected, setSelected] = useState(MESSAGES[0]);
  const [reply, setReply] = useState('');

  const handleSend = () => {
    if (!reply.trim()) return;
    toast.success('Reply sent!');
    setReply('');
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-500 mt-1">Buyer inquiries and conversations</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 h-[600px]">
        {/* Inbox */}
        <div className="card overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Inbox</h2>
            <p className="text-xs text-gray-400">{MESSAGES.filter(m => m.unread).length} unread</p>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {MESSAGES.map(msg => (
              <button key={msg.id} onClick={() => setSelected(msg)} className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${selected?.id === msg.id ? 'bg-primary-50' : ''}`}>
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <img src={msg.avatar} alt={msg.from} className="w-10 h-10 rounded-full object-cover" />
                    {msg.unread && <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-primary-600 rounded-full border-2 border-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium truncate ${msg.unread ? 'text-gray-900' : 'text-gray-600'}`}>{msg.from}</p>
                      <span className="text-xs text-gray-400 shrink-0 ml-2">{msg.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{msg.subject}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Message View */}
        <div className="lg:col-span-2 card overflow-hidden flex flex-col">
          {selected ? (
            <>
              <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                <img src={selected.avatar} alt={selected.from} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-gray-900">{selected.from}</p>
                  <p className="text-xs text-gray-500">{selected.subject}</p>
                </div>
              </div>
              <div className="flex-1 p-5 overflow-y-auto">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-50 rounded-2xl p-4 max-w-lg">
                  <p className="text-gray-700 text-sm leading-relaxed">{selected.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{selected.time}</p>
                </motion.div>
              </div>
              <div className="p-4 border-t border-gray-100">
                <div className="flex gap-3">
                  <textarea value={reply} onChange={e => setReply(e.target.value)} rows={2} placeholder="Type your reply..."
                    className="input-field flex-1 resize-none text-sm" />
                  <button onClick={handleSend} className="p-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors self-end">
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <div className="text-5xl mb-3">💬</div>
                <p>Select a message to view</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
