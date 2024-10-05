// libs
import { useState } from "react";
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

export const NewChatModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  return (
    <Modal
      onClose={() => setIsOpen(false)}
      closeable
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>New Chat</ModalHeader>
      <ModalBody>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Controlled Input"
          clearOnEscape
        />
      </ModalBody>
      <ModalFooter>
        <ModalButton kind={ButtonKind.tertiary}>Cancel</ModalButton>
        <ModalButton disabled={name.length}>Start New Chat</ModalButton>
      </ModalFooter>
    </Modal>
  );
};
