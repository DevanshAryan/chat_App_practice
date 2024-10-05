// libs
import { ReactElement, memo } from "react";

// components
import { MessageArea } from "./components/messageArea";
import { SendMessage } from "./components/sendMessage";

// types
import type { Message } from "../../../../types";
import type { OnAction } from "../../../actionHandler/types";

export const ConversationBody = memo(
  ({
    messages,
    selectedChat,
    onAction,
  }: {
    messages: Message[];
    selectedChat: string;
    onAction: OnAction;
  }): ReactElement => {
    return (
      <div
        className="px-20 py-1 overflow-y-scroll"
        style={{
          maxHeight: "80vh",
        }}
      >
        <MessageArea
          className="px-3 py-0 flex w-full flex-col gap-2 "
          messages={messages}
          onAction={onAction}
        />
        <SendMessage
          onAction={onAction}
          selectedChat={selectedChat}
          className={"px-3 py-2 flex gap-5"}
        />
      </div>
    );
  }
);
