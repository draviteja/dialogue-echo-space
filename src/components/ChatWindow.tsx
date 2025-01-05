import {
  makeStyles,
  Text,
  tokens,
  Avatar,
  Button,
  Input,
} from "@fluentui/react-components";
import { Send24Regular } from "@fluentui/react-icons";
import { Message } from "../types/chat";
import { useState } from "react";

const useStyles = makeStyles({
  chatWindow: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    flex: 1,
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  message: {
    display: "flex",
    gap: "12px",
    maxWidth: "800px",
    margin: "0 auto",
    width: "100%",
  },
  messageContent: {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    backgroundColor: tokens.colorNeutralBackground3,
  },
  inputArea: {
    padding: "20px",
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  inputWrapper: {
    display: "flex",
    gap: "12px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  input: {
    flex: 1,
  },
});

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
}

export const ChatWindow = ({ messages, onSendMessage }: ChatWindowProps) => {
  const styles = useStyles();
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.chatWindow}>
      <div className={styles.messages}>
        {messages.map((message) => (
          <div key={message.id} className={styles.message}>
            <Avatar
              image={{
                src:
                  message.role === "assistant"
                    ? "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/bot-image.png"
                    : undefined,
              }}
              name={message.role === "user" ? "You" : "Assistant"}
            />
            <div className={styles.messageContent}>
              <Text>{message.content}</Text>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.inputArea}>
        <div className={styles.inputWrapper}>
          <Input
            className={styles.input}
            value={newMessage}
            onChange={(e, data) => setNewMessage(data.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            multiline
          />
          <Button
            appearance="primary"
            icon={<Send24Regular />}
            onClick={handleSend}
          />
        </div>
      </div>
    </div>
  );
};