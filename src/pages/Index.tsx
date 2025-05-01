
import ChatInterface from "@/components/ChatInterface.tsx";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1419] p-4 relative overflow-hidden">
      {/* Logo como background com efeito de opacidade */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 z-0">
        <img 
          src="https://upload.wikimedia.org/wikipedia/pt/f/f9/Furia_Esports_logo.png" 
          alt="Logo" 
          className="w-[700px] h-[700px] object-contain"
        />
      </div>
      
      {/* Efeitos de luz de fundo */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[100px] opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-600/20 rounded-full blur-[100px] opacity-30"></div>
      
      <div className="container max-w-4xl h-[85vh] relative z-10">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-2">
            <img 
              src="https://upload.wikimedia.org/wikipedia/pt/f/f9/Furia_Esports_logo.png" 
              alt="ChatFurioso Logo" 
              className="w-12 h-12 mr-3"
            />
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
              ChatFurioso
            </h1>
          </div>
          <p className="text-gray-400 text-sm">Seu assistente virtual de gaming</p>
        </div>
        <ChatInterface />
      </div>
    </div>
  );
};

export default Index;