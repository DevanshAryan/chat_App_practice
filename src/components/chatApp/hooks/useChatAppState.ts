// libs
import { useState, useEffect } from "react";

// constants
import { CONVERSATIONS, CONVERSATION_ID_VS_MESSAGES } from "../constants";
import {
  ADD_NEW_CHAT,
  DELETE_CHAT,
  DELETE_MESSAGE,
  SELECT_CONVERSATION,
  SEND_MESSAGE,
  EDIT_MESSAGE,
} from "../actionTypes";

// types
import { UserState, onAction } from "../types";

const INITIAL_STATE = {
  conversationList: CONVERSATIONS,
  conversationIdVsMessages: CONVERSATION_ID_VS_MESSAGES,
  selectedChat: undefined,
};

export const useChatAppState = () => {
  const [user, setUser] = useState<UserState>(() => {
    const savedData = localStorage.getItem("myAppData");
    return savedData ? JSON.parse(savedData) : INITIAL_STATE;
  });

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      localStorage.setItem("myAppData", JSON.stringify(user));
      const confirmationMessage = "Are you sure you want to leave?";
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [user]);

  const onAction: onAction = (action) => {
    switch (action.type) {
      case ADD_NEW_CHAT: {
        const { chatId, message } = action.payload;
        setUser((prev) => {
          return {
            ...prev,
            selectedChat: chatId.id,
            conversationList: [...prev?.conversationList, chatId],
            conversationIdVsMessages: {
              ...prev.conversationIdVsMessages,
              [chatId.id]: [message],
            },
          };
        });
        break;
      }

      case SEND_MESSAGE: {
        const { message, chatId } = action.payload;
        setUser((prev) => {
          return {
            ...prev,
            conversationIdVsMessages: {
              ...prev.conversationIdVsMessages,

              [chatId]: [...prev.conversationIdVsMessages[chatId], message],
            },
          };
        });
        break;
      }
      case EDIT_MESSAGE: {
        const { message } = action.payload;
        setUser((prev) => {
          const updatedMessageList = prev.conversationIdVsMessages[
            prev.selectedChat!
          ].map((conversation) => {
            if (conversation.id === message.id) {
              return message;
            } else {
              return conversation;
            }
          });
          return {
            ...prev,
            conversationIdVsMessages: {
              ...prev.conversationIdVsMessages,
              [prev.selectedChat!]: updatedMessageList,
            },
          };
        });
        break;
      }

      case DELETE_CHAT: {
        const { chatId } = action.payload;

        setUser((prev) => {
          const filterUserIDds = prev.conversationList.filter(
            (conversation) => conversation.id !== chatId
          );
          const removedChatIdFromConversation = prev.conversationIdVsMessages;
          delete removedChatIdFromConversation[chatId];
          return {
            ...prev,
            conversationList: filterUserIDds,
            selectedChat:
              prev.selectedChat === chatId ? undefined : prev.selectedChat,
            conversationIdVsMessages: removedChatIdFromConversation,
          };
        });
        break;
      }

      case DELETE_MESSAGE: {
        const { messageId } = action.payload;
        setUser((prev) => {
          const leftMessages = prev.conversationIdVsMessages[
            prev.selectedChat!
          ].filter((message) => message.id !== messageId);

          return {
            ...prev,
            conversationIdVsMessages: {
              ...prev.conversationIdVsMessages,
              [prev.selectedChat!]: [...leftMessages],
            },
          };
        });
        break;
      }

      case SELECT_CONVERSATION: {
        const { selectedChatId } = action.payload;

        setUser((prev) => ({
          ...prev,
          selectedChat: selectedChatId,
        }));
        break;
      }
    }
  };

  return {
    user,
    onAction,
  };
};
