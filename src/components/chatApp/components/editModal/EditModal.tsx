// libs
import { useCallback, ReactElement } from "react";
// components
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from "baseui/modal";
import { Input } from "baseui/input";
import { KIND as ButtonKind } from "baseui/button";
import { useState } from "react";

// type
import { EDIT_MESSAGE } from "../../actionTypes";

export const EditModal = ({
  onClose,
  initialMessage,
  onAction,
}: {
  onClose: () => void;
  initialMessage: any;
  onAction: (props: any) => void;
}): ReactElement => {
  const [value, setValue] = useState(initialMessage.content);

  const handleOnEditConfirm = useCallback(() => {
    onAction({
      type: EDIT_MESSAGE,
      payload: {
        message: {
          ...initialMessage,
          content: value,
          timestamp: new Date().toLocaleTimeString(),
        },
      },
    });
    onClose();
  }, [onClose, initialMessage, value, onAction]);

  const handleOnChange = useCallback((e: any) => {
    setValue(e.target.value);
  }, []);

  return (
    <Modal
      onClose={onClose}
      closeable
      isOpen
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>Edit Message</ModalHeader>
      <ModalBody>
        <Input
          value={value}
          onChange={handleOnChange}
          overrides={{
            Root: {
              style: {
                borderRadius: "10px",
              },
            },
          }}
        />
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={onClose} kind={ButtonKind.tertiary}>
          Cancel
        </ModalButton>
        <ModalButton onClick={handleOnEditConfirm}>Ok</ModalButton>
      </ModalFooter>
    </Modal>
  );
};
