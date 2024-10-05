// libs
import { ReactElement, createContext, useState, memo } from "react";

// components
import { ActionHandler } from "./components/actionHandler/ActionHandler";
import LeftPane from "./components/leftPane/LeftPane";
import RightPane from "./components/rightPane/RightPane";

// hooks
import { useChatAppState } from "./hooks/useChatAppState";

// types
import { OnAction } from "./components/actionHandler/types";

type Context = {
  mode: string;
  setMode: (newMode: string) => void;
};

export const MyContext = createContext<Context>({
  mode: "DEFAULT",
  setMode: () => null,
});

const ChatApp = memo((): ReactElement => {
  const { user, onAction } = useChatAppState();

  const [mode, setMode] = useState("DEFAULT");

  return (
    <MyContext.Provider value={{ mode, setMode }}>
      <div className="flex flex-row min-h-screen">
        <ActionHandler onAction={onAction}>
          {({ onAction }: { onAction: OnAction }) => (
            <>
              <LeftPane
                selectedChat={user.selectedChat}
                onAction={onAction}
                conversationIdVsMessages={user.conversationIdVsMessages}
                conversationList={user.conversationList}
              />
              <RightPane
                selectedChat={user.selectedChat}
                user={user}
                onAction={onAction}
              />
            </>
          )}
        </ActionHandler>
      </div>
    </MyContext.Provider>
  );
});

export default ChatApp;
