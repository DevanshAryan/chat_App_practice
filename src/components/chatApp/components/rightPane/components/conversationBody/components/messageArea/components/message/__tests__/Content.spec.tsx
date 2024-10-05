import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Content } from "../Message";

// constants
import {
  OPEN_EDIT_CHAT_MODAL,
  OPEN_DELETE_MESSAGE_MODAL,
} from "../../../../../../../../actionHandler/actionTypes";

// types
import type { Message } from "../../../../../../../../../types";
import type { OnAction } from "../../../../../../../../actionHandler/types";

const mockOnAction = jest.fn() as OnAction;
const mockMessage = { id: "123", content: "Test message" } as Message;

describe("Sent Message Actions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("triggers edit action", () => {
    render(<Content message={mockMessage} onAction={mockOnAction} />);
    const editButton = screen.getByTitle("Edit");
    userEvent.click(editButton);

    expect(mockOnAction).toHaveBeenCalledWith({
      type: OPEN_EDIT_CHAT_MODAL,
      payload: {
        message: mockMessage,
      },
    });
  });

  test("triggers delete action", () => {
    render(<Content message={mockMessage} onAction={mockOnAction} />);
    const deleteButton = screen.getByTitle("Delete");
    userEvent.click(deleteButton);

    expect(mockOnAction).toHaveBeenCalledWith({
      type: OPEN_DELETE_MESSAGE_MODAL,
      payload: {
        messageId: mockMessage.id,
      },
    });
  });
});
