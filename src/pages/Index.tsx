import { makeStyles } from "@fluentui/react-components";
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { ChatWindow } from "../components/ChatWindow";
import { mockConversations } from "../data/mockData";
import { Conversation, Message } from "../types/chat";

const useStyles = makeStyles({
  container: {
    display: "flex",
    height: "100vh",
    overflow: "hidden",
  },
});

const Index = () => {
  const styles = useStyles();
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(
    conversations[0]
  );

  const handleNewChat = () => {
    const newConversation: Conversation = {
      id: String(Date.now()),
      title: "New Conversation",
      messages: [],
      timestamp: new Date(),
    };
    setConversations([newConversation, ...conversations]);
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

    setConversations(
      conversations.map((conv) =>
        conv.id === selectedConversation.id ? updatedConversation : conv
      )
    );
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