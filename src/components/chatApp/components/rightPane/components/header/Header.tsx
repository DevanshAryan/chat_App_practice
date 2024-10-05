// libs
import { ReactElement, useCallback, useContext, useState, memo } from "react";

// components
import { HeadingMedium } from "baseui/typography";
import { Checkbox, STYLE_TYPE, LABEL_PLACEMENT } from "baseui/checkbox";

// context
import { MyContext } from "../../../../ChatApp";

// types
import type { Conversation } from "../../../leftPane/components/chatList/types";

export const Header = memo(
  ({ chat }: { chat: Conversation[] }): ReactElement => {
    const { setMode } = useContext(MyContext);

    const [value, setValue] = useState(false);

    const handelOnChange = useCallback(() => {
      setValue(!value);
      if (value === false) setMode("COMPACT");
      else setMode("DEFAULT");
    }, [value, setMode]);

    return (
      <div
        className="flex justify-between items-center"
        style={{
          background: "#128C7E",
        }}
      >
        <div className="p-2 pl-4 flex justify-start items-center">
          <img
            src={chat[0].profileImg}
            alt="avatar"
            height="48px"
            width="48px"
            className="border border-white border-2 rounded-full bg-white flex justify-center align-center"
          />
          <HeadingMedium className="text-white ml-6">
            {chat[0].userName}
          </HeadingMedium>
        </div>
        <Checkbox
          overrides={{
            Root: {
              style: {
                marginRight: "1rem",
              },
            },
          }}
          checked={value}
          checkmarkType={STYLE_TYPE.toggle}
          onChange={handelOnChange}
          labelPlacement={LABEL_PLACEMENT.right}
        >
          Compact Mode
        </Checkbox>
      </div>
    );
  }
);
