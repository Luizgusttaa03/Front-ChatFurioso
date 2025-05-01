import React from "react";
import { motion } from "framer-motion";
import { CircleUser } from "lucide-react";

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    role: "user" | "ai" | "error";
  };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUserMessage = message.role === "user";
  const isErrorMessage = message.role === "error";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUserMessage ? "justify-end" : "justify-start"}`}
    >
      <div className="flex gap-2 max-w-[85%]">
        {!isUserMessage && (
          <div className="flex-shrink-0 mt-1">
            {isErrorMessage ? (
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">!</span>
              </div>
            ) : (
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/pt/f/f9/Furia_Esports_logo.png" 
                  alt="AI" 
                  className="w-6 h-6"
                />
              </div>
            )}
          </div>
        )}
        <div
          className={`px-4 py-2 break-words shadow-md ${
            isUserMessage
              ? "bg-purple-600 rounded-t-xl rounded-bl-xl"
              : isErrorMessage
              ? "bg-red-600 rounded-xl"
              : "bg-gray-600 rounded-t-xl rounded-br-xl"
          }`}
        >
          {message.content.split('\n').map((line, index, arr) => (
            <span key={index}>
              {line}
              {index < arr.length - 1 && <br />}
            </span>
          ))}
        </div>
        {isUserMessage && (
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <CircleUser className="w-5 h-5 text-white" />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;