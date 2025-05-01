import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage("");
      setIsTyping(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="p-3 border-t border-gray-700 bg-gray-800/30 backdrop-blur-sm"
    >
      <div className="flex items-center bg-gray-700/50 rounded-full px-2 py-1 border border-gray-600/70 focus-within:ring-2 focus-within:ring-purple-500 transition-all duration-200">
        <Input
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setIsTyping(e.target.value.length > 0);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua mensagem..."
          disabled={isLoading}
          className="flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-gray-400"
        />
        <Button 
          type="submit" 
          size="icon"
          disabled={!message.trim() || isLoading}
          className={`rounded-full transition-all duration-300 ml-2 ${isTyping ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-700 hover:bg-gray-600'}`}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;