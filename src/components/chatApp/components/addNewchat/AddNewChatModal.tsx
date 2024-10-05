// libs
import { useState, useCallback, ReactElement, memo } from "react";
import { v4 as uuidv4 } from "uuid";

// components
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from "baseui/modal";
import { Input } from "baseui/input";
import { ADD_NEW_CHAT } from "../../actionTypes";

// types
import type { OnAction } from "../actionHandler/types";

export const AddNewChatModal = memo(
  ({
    onAction,
    onClose,
  }: {
    onAction: OnAction;
    onClose: () => void;
  }): ReactElement => {
    const [name, setName] = useState("");
    const [value, setValue] = useState("");

    const handleOnAddChat = useCallback(() => {
      onAction({
        type: ADD_NEW_CHAT,
        payload: {
          chatId: {
            id: uuidv4(),
            profileImg: "https://api.dicebear.com/9.x/adventurer/svg?seed=Leo",
            userName: name,
          },
          message: {
            id: uuidv4(),
            senderId: "9",
            timestamp: new Date().toLocaleTimeString(),
            content: value,
          },
        },
      });
      onClose();
    }, [onClose, onAction, name, value]);

    return (
      <Modal onClose={onClose} isOpen>
        <ModalHeader
          style={{
            margin: "0",
            marginLeft: "1.2rem",
            marginTop: "0.5rem",
            padding: "1px",
          }}
        >
          <div className="m-0 p-1">Add New Chat</div>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-3">
            <Input
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              overrides={{
                Root: {
                  style: {
                    borderRadius: "10px",
                  },
                },
              }}
            />
            <Input
              placeholder="Type Message"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              overrides={{
                Root: {
                  style: {
                    borderRadius: "10px",
                  },
                  props: {
                    "data-testid": "add-modal-type-message",
                  },
                },
              }}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <ModalButton kind="tertiary" onClick={onClose}>
            Cancel
          </ModalButton>
          <ModalButton data-testid="add-modal-button" onClick={handleOnAddChat}>
            Add
          </ModalButton>
        </ModalFooter>
      </Modal>
    );
  }
);
