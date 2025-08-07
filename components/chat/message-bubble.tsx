'use client';

import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: {
    role: 'user' | 'assistant';
    content: string;
    timestamp?: Date;
  };
  isTyping?: boolean;
}

export function MessageBubble({ message, isTyping }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex w-full',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-3 shadow-lg backdrop-blur-sm',
          isUser
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-500/20'
            : 'bg-gray-900/70 text-gray-100 border border-white/10'
        )}
      >
        {isTyping ? (
          <div className="flex items-center gap-3">
            <div className="flex space-x-1.5">
              <div className="h-2 w-2 animate-bounce rounded-full bg-blue-400" style={{ animationDelay: '0ms' }}></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-blue-400" style={{ animationDelay: '150ms' }}></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-blue-400" style={{ animationDelay: '300ms' }}></div>
            </div>
            <span className="text-sm text-gray-200 italic">{message.content || 'Processing...'}</span>
          </div>
        ) : (
          <>
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
            {message.timestamp && (
              <p
                className={cn(
                  'mt-1 text-base',
                  isUser ? 'text-blue-100' : 'text-gray-200 dark:text-gray-200'
                )}
              >
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}