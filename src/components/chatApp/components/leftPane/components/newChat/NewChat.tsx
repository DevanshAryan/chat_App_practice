// libs
import { ReactElement, useCallback } from "react";

// icons
import { Plus } from "baseui/icon";
import { Button } from "baseui/button";

// constants
import { OPEN_NEW_CHAT_MODAL } from "../../../actionHandler/actionTypes";

// type
import { OnAction } from "../../../actionHandler/types";

export const NewChat = ({
  className,
  onAction,
}: {
  className: string;
  onAction: OnAction;
}): ReactElement => {
  const handelOnAddNewChat = useCallback(() => {
    onAction({
      type: OPEN_NEW_CHAT_MODAL,
    });
  }, [onAction]);

  return (
    <Button
      className={className}
      onClick={handelOnAddNewChat}
      style={{
        padding: "0",
      }}
    >
      <Plus
        title="Add a New Chat"
        size={25}
        style={{
          background: "#128C7E",
        }}
      />
    </Button>
  );
};
