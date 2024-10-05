// libs
import { ReactElement, memo } from "react";

// components
import { Header } from "./components/header";
import { ConversationList } from "./components/chatList";

// types
import type { Conversation } from "./components/chatList/types";
import type { OnAction } from "../actionHandler/types";
import type { ConversationIdVsMessages } from "../../types";

const LeftPane = memo(
  ({
    onAction,
    selectedChat,
    conversationList,
    conversationIdVsMessages,
  }: {
    onAction: OnAction;
    selectedChat: string | undefined;
    conversationList: Conversation[];
    conversationIdVsMessages: ConversationIdVsMessages;
  }): ReactElement => {
    return (
      <div className="w-1/4 h-full border-black border overflow-scroll min-h-screen flex flex-col">
        <Header onAction={onAction} />
        <ConversationList
          onAction={onAction}
          conversationIdVsMessages={conversationIdVsMessages}
          selectedChat={selectedChat}
          conversationList={conversationList}
        />
      </div>
    );
  }
);

export default LeftPane;
