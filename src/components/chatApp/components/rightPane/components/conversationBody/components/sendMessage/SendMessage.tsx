// libs
import { v4 as uuidv4 } from "uuid";
import { useCallback, ReactElement, memo } from "react";

// components
import { Button } from "baseui/button";
import { Input } from "baseui/input";
import { useState } from "react";

// constants
import { SEND_MESSAGE } from "../../../../../../actionTypes";
import type { OnAction } from "../../../../../actionHandler/types";

export const SendMessage = memo(
  ({
    className,
    selectedChat,
    onAction,
  }: {
    className: string;
    selectedChat: string;
    onAction: OnAction;
  }): ReactElement => {
    const [text, setText] = useState("");

    const handleOnChange = useCallback((e: any) => {
      setText((prev) => e.target.value);
    }, []);

    const handleOnSend = useCallback(() => {
      onAction({
        type: SEND_MESSAGE,
        payload: {
          message: {
            id: uuidv4(),
            content: text,
            senderId: "9",
            timestamp: new Date().toLocaleTimeString(),
          },
          chatId: selectedChat,
        },
      });
      setText("");
    }, [onAction, text, selectedChat]);

    return (
      <div
        className={`fixed ${className} flex justify-between items-center`}
        style={{ bottom: "2rem", width: "66%" }}
      >
        <Input
          onChange={handleOnChange}
          placeholder="Type a Message"
          overrides={{
            Root: {
              style: {
                borderRadius: "10px",
              },
            },
          }}
          value={text}
        />
        <Button
          onClick={handleOnSend}
          data-testid="send-message-button"
          className="p-2 rounded-lg"
          style={{
            background: "#128C7E",
          }}
        >
          Send
        </Button>
      </div>
    );
  }
);
