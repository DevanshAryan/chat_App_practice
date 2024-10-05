// libs
import { ReactElement, memo } from "react";

// components
import { Header } from "./components/header";
import { EmptyState } from "./EmptyState";
import { ConversationBody } from "./components/conversationBody";

// type
import { UserState } from "../../types";
import { OnAction } from "../actionHandler/types";

const RightPane = memo(
  ({
    user,
    onAction,
    selectedChat,
  }: {
    user: UserState;
    onAction: OnAction;
    selectedChat: undefined | string;
  }): ReactElement => {
    if (selectedChat === undefined) return <EmptyState />;

    const FilterSelectedChatName = user.conversationList.filter(
      (conversation) => conversation.id === selectedChat
    );

    const idVsChats = user.conversationIdVsMessages[selectedChat];
    return (
      <div className="w-3/4 border-black border-y ">
        <Header chat={FilterSelectedChatName} />
        <ConversationBody
          onAction={onAction}
          selectedChat={selectedChat}
          messages={idVsChats}
        />
      </div>
    );
  }
);

export default RightPane;
