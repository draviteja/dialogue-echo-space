import { makeStyles } from "@fluentui/react-components";
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { ChatWindow } from "../components/ChatWindow";
import { Conversation, Message } from "../types/chat";
import { useQuery } from "@tanstack/react-query";

const useStyles = makeStyles({
  container: {
    display: "flex",
    height: "100vh",
    overflow: "hidden",
  },
});

interface ApiConversation {
  id: string;
  conversationId: string;
  userId: string | null;
  title: string;
  createdAt: string;
  updatedAt: string;
}

const fetchConversations = async (): Promise<ApiConversation[]> => {
  const response = await fetch("api/chats");
  if (!response.ok) {
    throw new Error("Failed to fetch conversations");
  }
  return response.json();
};

const Index = () => {
  const styles = useStyles();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  const { data: apiConversations, isLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: fetchConversations,
  });

  // Transform API conversations to match our Conversation type
  const conversations: Conversation[] = apiConversations?.map((conv) => ({
    id: conv.conversationId,
    title: conv.title,
    messages: [],
    timestamp: new Date(conv.createdAt),
  })) || [];

  const handleNewChat = () => {
    const newConversation: Conversation = {
      id: String(Date.now()),
      title: "New Conversation",
      messages: [],
      timestamp: new Date(),
    };
    setSelectedConversation(newConversation);
  };

  const handleSendMessage = (content: string) => {
    if (!selectedConversation) return;

    const newMessage: Message = {
      id: String(Date.now()),
      content,
      role: "user",
      timestamp: new Date(),
    };

    const mockResponse: Message = {
      id: String(Date.now() + 1),
      content: "This is a mock response. The backend is not implemented yet.",
      role: "assistant",
      timestamp: new Date(),
    };

    const updatedConversation = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage, mockResponse],
    };

    setSelectedConversation(updatedConversation);
  };

  return (
    <div className={styles.container}>
      <Sidebar
        conversations={conversations}
        selectedConversation={selectedConversation}
        onSelectConversation={setSelectedConversation}
        onNewChat={handleNewChat}
      />
      {selectedConversation && (
        <ChatWindow
          messages={selectedConversation.messages}
          onSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
};

export default Index;