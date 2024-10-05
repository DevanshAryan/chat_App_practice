// libs
import { ReactElement } from "react";
// components
import { HeadingSmall } from "baseui/typography";
import { NewChat } from "../newChat";

// types
import { OnAction } from "../../../actionHandler/types";

export const Header = ({ onAction }: { onAction: OnAction }): ReactElement => {
  return (
    <div
      className="p-2 flex justify-between items-center gap-12"
      style={{
        background: "#128C7E",
      }}
    >
      <div className="flex justify-center items-center">
        <img
          src="https://api.dicebear.com/9.x/adventurer/svg?seed=Liam"
          alt="avatar"
          height="48px"
          width="48px"
          className="border border-white border-2 rounded-full bg-white flex justify-center align-center flex-none"
        />
        <HeadingSmall className="text-white ml-3 flex-none">
          Devansh Aryan (You)
        </HeadingSmall>
      </div>
      <NewChat onAction={onAction} className="p-0 flex-none" />
    </div>
  );
};
