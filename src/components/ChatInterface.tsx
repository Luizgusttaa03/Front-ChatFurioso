import React, { useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import ChatContainer from "./ChatContainer";
import ChatInput from "./ChatInput";

interface Message {
  id: string;
  content: string;
  role: "user" | "ai" | "error";
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Olá! Em que posso ajudar sobre a FURIA hoje?",
      role: "ai",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => 
    typeof window !== "undefined" ? crypto.randomUUID() : ""
  );

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;
    
    const newUserMessage = {
      id: `user-${Date.now()}`,
      content,
      role: "user" as const,
    };
    
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);
    
    try {
      const response = await axios.post('https://api-chatfurioso.onrender.com/chat', {
        data: {
          id: '',
          type: 'messages',
          attributes: { content },
          meta: { session_uuid: sessionId }
        }
      });
      
      const reply = response.data?.data?.attributes?.content;
      if (reply) {
        const newAiMessage = {
          id: `ai-${Date.now()}`,
          content: reply,
          role: "ai" as const,
        };
        setMessages((prev) => [...prev, newAiMessage]);
      } else {
        const errorMessage = {
          id: `error-${Date.now()}`,
          content: 'Recebi uma resposta inesperada do servidor.',
          role: "error" as const,
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
      let errorContent = 'Erro ao se conectar com o servidor. Tente novamente mais tarde.';
      if (axios.isAxiosError(err)) {
        if (err.response) {
          errorContent = `Erro ${err.response.status}: ${err.response.data?.error || 'Ocorreu um erro no servidor.'}`;
        } else if (err.request) {
          errorContent = 'Não foi possível conectar ao servidor. Verifique sua conexão.';
        }
      } else if (err instanceof Error) {
        errorContent = err.message;
      }
      
      const errorMessage = {
        id: `error-${Date.now()}`,
        content: errorContent,
        role: "error" as const,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-full border-gray-700 bg-[#16191e]/80 backdrop-blur-lg overflow-hidden shadow-xl">
      <div className="border-b border-gray-700 px-6 py-3">
        <div className="flex items-center space-x-2">
          <img 
            src="https://upload.wikimedia.org/wikipedia/pt/f/f9/Furia_Esports_logo.png" 
            alt="ChatFurioso" 
            className="w-6 h-6"
          />
          <h2 className="font-semibold text-white">ChatFurioso <span role="img" aria-label="pata">🐾</span></h2>
        </div>
      </div>
      <ChatContainer messages={messages} isLoading={isLoading} />
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </Card>
  );
};

export default ChatInterface;