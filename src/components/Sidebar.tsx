import {
  Button,
  makeStyles,
  Text,
  tokens,
  Card,
} from "@fluentui/react-components";
import { Add24Regular } from "@fluentui/react-icons";
import { Conversation } from "../types/chat";

const useStyles = makeStyles({
  sidebar: {
    width: "260px",
    height: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
    padding: "16px",
    gap: "16px",
    borderRight: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  newChat: {
    width: "100%",
  },
  conversationList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    overflowY: "auto",
  },
  conversationItem: {
    cursor: "pointer",
    padding: "8px",
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  selected: {
    backgroundColor: tokens.colorNeutralBackground3,
  },
});

interface SidebarProps {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
  onNewChat: () => void;
}

export const Sidebar = ({
  conversations,
  selectedConversation,
  onSelectConversation,
  onNewChat,
}: SidebarProps) => {
  const styles = useStyles();

  return (
    <div className={styles.sidebar}>
      <Button
        className={styles.newChat}
        appearance="primary"
        icon={<Add24Regular />}
        onClick={onNewChat}
      >
        New chat
      </Button>
      <div className={styles.conversationList}>
        {conversations.map((conversation) => (
          <Card
            key={conversation.id}
            className={`${styles.conversationItem} ${
              selectedConversation?.id === conversation.id ? styles.selected : ""
            }`}
            onClick={() => onSelectConversation(conversation)}
          >
            <Text>{conversation.title}</Text>
          </Card>
        ))}
      </div>
    </div>
  );
};