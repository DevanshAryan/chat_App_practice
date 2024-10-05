// constants
import {
  ADD_NEW_CHAT,
  DELETE_CHAT,
  DELETE_MESSAGE,
  EDIT_MESSAGE,
  SELECT_CONVERSATION,
  SEND_MESSAGE,
} from "./actionTypes";

export type Conversation = {
  id: string;
  userName: string;
  profileImg: string;
};

export type ConversationIdVsMessages = {
  [key: Conversation["id"]]: Message[];
};

export type Message = {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
};

export type SelectedChat = Conversation["id"] | undefined;

export type UserState = {
  conversationList: Conversation[];
  conversationIdVsMessages: ConversationIdVsMessages;
  selectedChat: SelectedChat;
};

type addNewChatAction = {
  type: typeof ADD_NEW_CHAT;
  payload: {
    chatId: Conversation;
    message: Message;
  };
};

type deleteMessageAction = {
  type: typeof DELETE_MESSAGE;
  payload: {
    messageId: Message["id"];
  };
};

type deleteChatAction = {
  type: typeof DELETE_CHAT;
  payload: {
    chatId: Conversation["id"];
  };
};

type sendMessageAction = {
  type: typeof SEND_MESSAGE;
  payload: {
    message: Message;
    chatId: Conversation["id"];
  };
};

type selectConversationAction = {
  type: typeof SELECT_CONVERSATION;
  payload: {
    selectedChatId: Conversation["id"];
  };
};

type editMessageAction = {
  type: typeof EDIT_MESSAGE;
  payload: {
    message: Message;
  };
};

export type Action =
  | editMessageAction
  | sendMessageAction
  | deleteChatAction
  | deleteMessageAction
  | addNewChatAction
  | selectConversationAction;

export type onAction = (action: Action) => void;
