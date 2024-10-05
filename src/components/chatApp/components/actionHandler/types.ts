// constants
import {
  OPEN_DELETE_CHAT_MODAL,
  OPEN_DELETE_MESSAGE_MODAL,
  OPEN_EDIT_CHAT_MODAL,
  OPEN_NEW_CHAT_MODAL,
} from "./actionTypes";

// types
import type { Message, Action as GlobalAction } from "../../types";

export enum OVERLAY {
  "DEFAULT" = "DEFAULT",
  "ADD_NEW_CHAT" = "ADD_NEW_CHAT",
  "DELETE_CHAT" = "DELETE_CHAT",
  "DELETE_MESSAGE" = "DELETE_MESSAGE",
  "EDIT_CHAT" = "EDIT_CHAT",
}

type AddNewChatModalAction = {
  type: typeof OPEN_NEW_CHAT_MODAL;
};

type DeleteMessageModalAction = {
  type: typeof OPEN_DELETE_MESSAGE_MODAL;
  payload: {
    messageId: string;
  };
};

type DeleteChatModalAction = {
  type: typeof OPEN_DELETE_CHAT_MODAL;
  payload: {
    chatId: string;
  };
};

type editChatModalAction = {
  type: typeof OPEN_EDIT_CHAT_MODAL;
  payload: {
    message: Message;
  };
};

type LocalAction =
  | AddNewChatModalAction
  | DeleteMessageModalAction
  | editChatModalAction
  | DeleteChatModalAction;

export type Action = LocalAction | GlobalAction;

export type OnAction = (action: Action) => void;
