// libs
import { ReactElement, memo } from "react";

// components
import { Message } from "./components/message";

// types
import type { Message as MessageType } from "../../../../../../types";
import type { OnAction } from "../../../../../actionHandler/types";

export const MessageArea = memo(
  ({
    className,
    messages,
    onAction,
  }: {
    className: string;
    messages: MessageType[];
    onAction: OnAction;
  }): ReactElement => {
    return (
      <div className={`${className}`}>
        {messages.map((message) => (
          <Message onAction={onAction} key={message.id} message={message} />
        ))}
      </div>
    );
  }
);
