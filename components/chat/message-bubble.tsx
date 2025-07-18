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
          'max-w-[80%] rounded-2xl px-4 py-2 shadow-sm',
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
        )}
      >
        {isTyping ? (
          <div className="flex space-x-2 py-1">
            <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 animation-delay-0"></div>
            <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 animation-delay-200"></div>
            <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 animation-delay-400"></div>
          </div>
        ) : (
          <>
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
            {message.timestamp && (
              <p
                className={cn(
                  'mt-1 text-xs',
                  isUser ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
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