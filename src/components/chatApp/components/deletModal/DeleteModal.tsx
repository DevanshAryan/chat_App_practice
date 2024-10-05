import { ReactElement, memo } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from "baseui/modal";
import { KIND as ButtonKind } from "baseui/button";

export const DeleteModal = memo(
  ({
    onClose,
    onDelete,
    type,
  }: {
    onClose: () => void;
    type: string;
    onDelete: () => void;
  }): ReactElement => {
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
        <ModalHeader>{`Delete ${type}`}</ModalHeader>
        <ModalBody>{`Are you sure you want to delete this ${type}?`}</ModalBody>
        <ModalFooter>
          <ModalButton onClick={onClose} kind={ButtonKind.tertiary}>
            Cancel
          </ModalButton>
          <ModalButton onClick={onDelete}>Delete</ModalButton>
        </ModalFooter>
      </Modal>
    );
  }
);
