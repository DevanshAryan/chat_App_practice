// libs
import { useState } from "react";

// type
import { OVERLAY, OnAction, Action } from "../types";

// constants
import {
  OPEN_DELETE_CHAT_MODAL,
  OPEN_DELETE_MESSAGE_MODAL,
  OPEN_EDIT_CHAT_MODAL,
  OPEN_NEW_CHAT_MODAL,
} from "../actionTypes";
import { DELETE_CHAT, DELETE_MESSAGE } from "../../../actionTypes";

type StateType = {
  overlay: OVERLAY;
  entity: any;
};

type useActionHandlerReturnType = {
  state: StateType;
  onAction: OnAction;
  onClose: () => void;
  handleOnDeleteMessage: () => void;
  handleOnDeleteChat: () => void;
};

const INITIAL_STATE = {
  overlay: OVERLAY.DEFAULT,
  entity: undefined,
};

export const useActionHandler = ({
  onParentAction,
}: {
  onParentAction: (props: any) => void;
}): useActionHandlerReturnType => {
  const [state, setState] = useState<StateType>(INITIAL_STATE);

  const handleOverlayClose = () => {
    setState((prev) => ({
      overlay: OVERLAY.DEFAULT,
      entity: undefined,
    }));
  };
  const handleOnDeleteMessage = () => {
    onParentAction({
      type: DELETE_MESSAGE,
      payload: {
        messageId: state.entity!,
      },
    });
    setState(INITIAL_STATE);
  };
  const handleOnDeleteChat = () => {
    onParentAction({
      type: DELETE_CHAT,
      payload: {
        chatId: state.entity!,
      },
    });
    setState(INITIAL_STATE);
  };
  const onAction = (action: Action) => {
    switch (action.type) {
      case OPEN_NEW_CHAT_MODAL: {
        setState({
          overlay: OVERLAY.ADD_NEW_CHAT,
          entity: undefined,
        });
        break;
      }

      case OPEN_DELETE_MESSAGE_MODAL: {
        const { messageId } = action.payload;
        setState({
          overlay: OVERLAY.DELETE_MESSAGE,
          entity: messageId,
        });
        break;
      }

      case OPEN_DELETE_CHAT_MODAL: {
        const { chatId } = action.payload;
        setState({
          overlay: OVERLAY.DELETE_CHAT,
          entity: chatId,
        });
        break;
      }

      case OPEN_EDIT_CHAT_MODAL: {
        const { message } = action.payload;
        setState({
          overlay: OVERLAY.EDIT_CHAT,
          entity: message,
        });
        break;
      }

      default:
        onParentAction(action);
    }
  };

  return {
    state,
    onAction,
    onClose: handleOverlayClose,
    handleOnDeleteMessage,
    handleOnDeleteChat,
  };
};
