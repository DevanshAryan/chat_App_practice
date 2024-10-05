// libs
import { ReactElement, ReactNode, memo } from "react";

// components
import { AddNewChatModal } from "../addNewchat/AddNewChatModal";
import { DeleteModal } from "../deletModal/index";
import { useActionHandler } from "./hooks/useActionHandler";
import { OVERLAY } from "./types";
import { EditModal } from "../editModal";

// type
import type { OnAction } from "./types";
import type { onAction } from "../../types";

export const ActionHandler = memo(
  ({
    children,
    onAction: onParentAction,
  }: {
    children: ({ onAction }: { onAction: OnAction }) => ReactNode;
    onAction: onAction;
  }): ReactElement => {
    const {
      state,
      onClose,
      onAction,
      handleOnDeleteMessage,
      handleOnDeleteChat,
    } = useActionHandler({
      onParentAction,
    });
    return (
      <>
        {children({ onAction })}
        {state.overlay === OVERLAY.DELETE_MESSAGE ? (
          <DeleteModal
            type={"Message"}
            onClose={onClose}
            onDelete={handleOnDeleteMessage}
          />
        ) : null}
        {state.overlay === OVERLAY.DELETE_CHAT ? (
          <DeleteModal
            type={"Chat"}
            onClose={onClose}
            onDelete={handleOnDeleteChat}
          />
        ) : null}
        {state.overlay === OVERLAY.EDIT_CHAT ? (
          <EditModal
            onClose={onClose}
            initialMessage={state.entity}
            onAction={onAction}
          />
        ) : null}
        {state.overlay === OVERLAY.ADD_NEW_CHAT ? (
          <AddNewChatModal onClose={onClose} onAction={onAction} />
        ) : null}
      </>
    );
  }
);
