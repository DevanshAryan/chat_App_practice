// libs
import {
  useCallback,
  useContext,
  useState,
  useMemo,
  memo,
  ReactElement,
} from "react";

// components
import { ParagraphMedium, ParagraphSmall } from "baseui/typography";
import { StatefulTooltip, ACCESSIBILITY_TYPE } from "baseui/tooltip";
import { DeleteAlt } from "baseui/icon";

// types
import type { Conversation } from "./types";

// constants
import { SELECT_CONVERSATION } from "../../../../actionTypes";
import { OPEN_DELETE_CHAT_MODAL } from "../../../actionHandler/actionTypes";

// types
import type { OnAction } from "../../../actionHandler/types";
import type { ConversationIdVsMessages } from "../../../../types";

// context
import { MyContext } from "../../../../ChatApp";

const MAX_LINE_HEIGHT = 40;
function getTextWidth(text: string, font?: string): number {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (context) {
    context.font = font || getComputedStyle(document.body).font;

    return context.measureText(text).width;
  }

  return 0;
}

const Content = memo(({ text }: { text: string }): ReactElement => {
  return <div className="flex max-w-32">{text}</div>;
});

const Conversation = memo(
  ({
    conversation,
    selectedChat,
    onAction,
    conversationIdVsMessages,
  }: {
    conversation: Conversation;
    selectedChat: string | undefined;
    onAction: OnAction;
    conversationIdVsMessages: ConversationIdVsMessages;
  }): ReactElement => {
    const lastMessage = useMemo(
      () =>
        conversationIdVsMessages[conversation.id][
          conversationIdVsMessages[conversation.id].length - 1
        ].content,
      [
        conversationIdVsMessages[conversation.id][
          conversationIdVsMessages[conversation.id].length - 1
        ].content,
      ]
    );

    const { mode } = useContext(MyContext);
    const [calculating, isCalculating] = useState(true);
    const [showTootlip, setShowtooltip] = useState(0);

    const handleOnClick = useCallback(() => {
      onAction({
        type: SELECT_CONVERSATION,
        payload: { selectedChatId: conversation.id },
      });
    }, [onAction, conversation.id]);

    const handleOnDelete = useCallback(
      (e: any) => {
        e.stopPropagation();
        onAction({
          type: OPEN_DELETE_CHAT_MODAL,
          payload: { chatId: conversation.id },
        });
      },
      [onAction, conversation.id]
    );

    let value = 0;
    if (value === 0 && calculating) {
      value = (getTextWidth(lastMessage) / 300) * 20;
      console.log({ value });
      isCalculating(false);
      setShowtooltip(Math.max(0, value - MAX_LINE_HEIGHT));
    }
    return (
      <div
        key={conversation.id}
        className={
          !!selectedChat && selectedChat === conversation.id
            ? "p-2 border-b flex flex-row justify-between items-center cursor-pointer bg-gray-200 transition-colors group"
            : "p-2 border-b flex flex-row justify-between items-center cursor-pointer hover:bg-gray-200 transition-colors group"
        }
        onClick={handleOnClick}
      >
        <div className="flex justify-center items-center">
          <img
            src={conversation.profileImg}
            alt="avatar"
            height="48px"
            width="48px"
            className="border border-white border-2 rounded-full bg-white flex justify-center align-center mr-3"
          />
          <div className="flex flex-col justify-center items-start gap-1">
            <ParagraphMedium className="flex-none">
              {conversation.userName}
            </ParagraphMedium>
            {mode === "DEFAULT" ? (
              <StatefulTooltip
                placement="topRight"
                content={showTootlip ? <Content text={lastMessage} /> : null}
                accessibilityType={ACCESSIBILITY_TYPE.tooltip}
              >
                <ParagraphSmall
                  className={`text-ellipsis overflow-hidden ${
                    showTootlip ? "line-clamp-2" : ""
                  }`}
                >
                  {
                    conversationIdVsMessages[conversation.id][
                      conversationIdVsMessages[conversation.id].length - 1
                    ].content
                  }
                </ParagraphSmall>
              </StatefulTooltip>
            ) : null}
          </div>
        </div>
        <div
          className={`pr-4 group-hover:visible ${
            !!selectedChat && selectedChat === conversation.id
              ? "visible"
              : "invisible"
          }`}
          onClick={handleOnDelete}
        >
          <DeleteAlt size={16} />
        </div>
      </div>
    );
  }
);

export const ConversationList = memo(
  ({
    conversationList,
    selectedChat,
    onAction,
    conversationIdVsMessages,
  }: {
    conversationList: Conversation[];
    selectedChat: string | undefined;
    onAction: OnAction;
    conversationIdVsMessages: ConversationIdVsMessages;
  }): ReactElement => {
    return (
      <div>
        {conversationList.map((conversation) => (
          <Conversation
            key={conversation.id}
            onAction={onAction}
            conversationIdVsMessages={conversationIdVsMessages}
            conversation={conversation}
            selectedChat={selectedChat}
          />
        ))}
      </div>
    );
  }
);
