'use client';

import { useState } from 'react';
import { Send, Mic, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  suggestedReplies?: string[];
}

export function ChatInput({
  onSendMessage,
  isLoading,
  placeholder = 'Type your message...',
  suggestedReplies = []
}: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleSuggestedReply = (reply: string) => {
    if (!isLoading) {
      onSendMessage(reply);
    }
  };

  return (
    <div className="border-t border-white/10 bg-gray-900/50 backdrop-blur-sm">
      {/* Suggested replies */}
      {suggestedReplies.length > 0 && (
        <div className="flex flex-wrap gap-2 border-b border-white/10 p-3">
          {suggestedReplies.map((reply, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleSuggestedReply(reply)}
              disabled={isLoading}
              className="text-sm bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/30"
            >
              {reply}
            </Button>
          ))}
        </div>
      )}

      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0 text-gray-400 hover:text-gray-200 hover:bg-white/10"
          disabled
          title="Voice input coming soon"
        >
          <Mic className="h-5 w-5" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0 text-gray-400 hover:text-gray-200 hover:bg-white/10"
          disabled
          title="Image upload coming soon"
        >
          <Image className="h-5 w-5" />
        </Button>

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          autoFocus
        />

        <Button
          type="submit"
          size="icon"
          disabled={!message.trim() || isLoading}
          className={cn(
            'shrink-0 transition-all',
            message.trim() && !isLoading
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25'
              : 'bg-white/10 text-gray-400'
          )}
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}