import React, { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  content: string;
  role: "user" | "ai" | "error";
}

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <ScrollArea className="flex-1 overflow-y-auto p-4">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full py-12">
          <img 
            src="https://upload.wikimedia.org/wikipedia/pt/f/f9/Furia_Esports_logo.png" 
            alt="ChatFurioso Logo" 
            className="w-16 h-16 opacity-30 mb-4"
          />
          <h3 className="text-xl font-medium text-gray-400">Bem-vindo ao ChatFurioso</h3>
          <p className="text-gray-500 text-center max-w-md mt-2">
            Seu assistente de gaming para estratégias, dicas e conversas sobre o universo dos jogos.
          </p>
        </div>
      ) : (
        <AnimatePresence initial={false}>
          <div className="space-y-3">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div className="px-4 py-2 rounded-t-xl rounded-br-xl bg-gray-600 text-white inline-flex items-center space-x-2 shadow-md">
                  <span className="animate-pulse">Digitando...</span>
                </div>
              </motion.div>
            )}
          </div>
        </AnimatePresence>
      )}
      <div ref={messagesEndRef} className="h-1" />
    </ScrollArea>
  );
};

export default ChatContainer;
