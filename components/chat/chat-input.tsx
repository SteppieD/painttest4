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
    <div className="border-t bg-white dark:bg-gray-900">
      {/* Suggested replies */}
      {suggestedReplies.length > 0 && (
        <div className="flex flex-wrap gap-2 border-b p-3">
          {suggestedReplies.map((reply, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleSuggestedReply(reply)}
              disabled={isLoading}
              className="text-sm"
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
          className="shrink-0"
          disabled
          title="Voice input coming soon"
        >
          <Mic className="h-5 w-5" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0"
          disabled
          title="Image upload coming soon"
        >
          <Image className="h-5 w-5" />
        </Button>

        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          className="flex-1"
          autoFocus
        />

        <Button
          type="submit"
          size="icon"
          disabled={!message.trim() || isLoading}
          className={cn(
            'shrink-0',
            message.trim() && !isLoading
              ? 'bg-blue-600 hover:bg-blue-700'
              : ''
          )}
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}