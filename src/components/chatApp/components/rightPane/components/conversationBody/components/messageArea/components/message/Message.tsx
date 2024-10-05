import { ReactElement, useContext } from "react";

// components
import { StatefulPopover, TRIGGER_TYPE } from "baseui/popover";
import { Button, SIZE } from "baseui/button";
import { ButtonGroup } from "baseui/button-group";
import { Menu, DeleteAlt } from "baseui/icon";
import { ParagraphSmall } from "baseui/typography";

// constants
import {
  OPEN_EDIT_CHAT_MODAL,
  OPEN_DELETE_MESSAGE_MODAL,
} from "../../../../../../../actionHandler/actionTypes";

// types
import type { Message as MessageType } from "../../../../../../../../types";
import type { OnAction } from "../../../../../../../actionHandler/types";
import { MyContext } from "../../../../../../../../ChatApp";

export const Content = ({
  message,
  onAction,
}: {
  message: MessageType;
  onAction: OnAction;
}) => {
  const handleOnEdit = () => {
    onAction({
      type: OPEN_EDIT_CHAT_MODAL,
      payload: {
        message: message,
      },
    });
  };
  const handleOnDelete = () => {
    onAction({
      type: OPEN_DELETE_MESSAGE_MODAL,
      payload: {
        messageId: message.id,
      },
    });
  };
  return (
    <ButtonGroup>
      <Button size={SIZE.mini} title="Edit" onClick={handleOnEdit}>
        <Menu size={16} />
        <ParagraphSmall>Edit</ParagraphSmall>
      </Button>
      <Button size={SIZE.mini} title="Delete" onClick={handleOnDelete}>
        <DeleteAlt size={16} />
        <ParagraphSmall>Delete</ParagraphSmall>
      </Button>
    </ButtonGroup>
  );
};

export const Message = ({
  message,
  onAction,
}: {
  message: MessageType;
  onAction: OnAction;
}): ReactElement => {
  const isMe = message.senderId === "9";
  const { mode } = useContext(MyContext);
  return !isMe ? (
    <div
      className={"self-start rounded-lg p-2 py-1"}
      style={{ backgroundColor: "#F5F5F5", maxWidth: "75%" }}
    >
      <div className="py-1 text-16 break-words">{message.content}</div>
      {mode === "DEFAULT" ? (
        <div className={"self-end"}>{message.timestamp}</div>
      ) : null}
    </div>
  ) : (
    <StatefulPopover
      content={<Content message={message} onAction={onAction} />}
      accessibilityType={"tooltip"}
      triggerType={TRIGGER_TYPE.hover}
      placement="top"
    >
      <div
        className={"self-end flex flex-col rounded-lg p-2 py-1"}
        style={{
          backgroundColor: "#E9EBFA",
          maxWidth: "75%",
        }}
      >
        <div className="py-1 text-16 break-words">{message.content}</div>
        {mode === "DEFAULT" ? (
          <div className={"self-end"}>{message.timestamp}</div>
        ) : null}
      </div>
    </StatefulPopover>
  );
};
