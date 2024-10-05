import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChatApp from "../ChatApp";

describe("test ChatApp", () => {
  test("Should display my name correctly", async () => {
    render(<ChatApp />);

    await screen.findByText("Devansh Aryan (You)");
  });

  test("Should display No conversations selected when app loads initially", async () => {
    render(<ChatApp />);

    await screen.findByText("No conversations selected");
  });

  test("Add new chat button to be present in dom", async () => {
    render(<ChatApp />);

    const button = screen.getByRole("button", { name: /add a new chat/i });
    userEvent.click(button);

    await screen.findByText("Add New Chat");
  });

  test("on clicking Add new chat, user will see a modal with 2 fields", async () => {
    render(<ChatApp />);

    const button = screen.getByRole("button", { name: /add a new chat/i });
    userEvent.click(button);
    const nameField = screen.getByPlaceholderText("Enter Name");

    const view = screen.getByTestId("add-modal-type-message");

    const messageField = within(view).getByRole("textbox");
    userEvent.type(nameField, "randomName");
    userEvent.type(messageField, "randomName Message");

    const addButton = await screen.findByTestId("add-modal-button");

    userEvent.click(addButton);

    const nameElements = screen.getAllByText("randomName");
    expect(nameElements.length).toBeGreaterThan(0);

    const messageElements = screen.getAllByText("randomName Message");
    expect(messageElements.length).toBeGreaterThan(0);
  });

  test("sends message for the selected chat", async () => {
    render(<ChatApp />);

    const button = screen.getByRole("button", { name: /add a new chat/i });
    userEvent.click(button);
    const nameField = screen.getByPlaceholderText("Enter Name");

    const view = screen.getByTestId("add-modal-type-message");

    const messageField = within(view).getByRole("textbox");
    userEvent.type(nameField, "randomName");
    userEvent.type(messageField, "randomName Message");

    const addButton = await screen.findByTestId("add-modal-button");

    userEvent.click(addButton);

    const textArea = screen.getByRole("textbox");
    userEvent.type(textArea, "Dummy Message");

    const sendButton = await screen.findByTestId("send-message-button");
    userEvent.click(sendButton);
    screen.logTestingPlaygroundURL();
    const sendMessageElement = screen.getAllByText("Dummy Message");
    expect(sendMessageElement.length).toBeGreaterThan(0);
  });

  test("on Deleting a selected chat", async () => {
    render(<ChatApp />);
    const batmanDiv = screen.getByText("Batman").closest("div");
    userEvent.click(batmanDiv!);

    const deleteIcon = batmanDiv!.querySelectorAll('svg[title="Delete Alt"]');
    console.log("🚀 ~ test.only ~ deleteIcon:", deleteIcon);
    userEvent.click(deleteIcon[0]!);
    screen.logTestingPlaygroundURL();
    expect(
      screen.getByText("Are you sure you want to delete this Chat?")
    ).toBeInTheDocument();
  });
});
