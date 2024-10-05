export const EmptyState = () => {
  return (
    <div
      className="flex flex-col items-center justify-center w-3/4 p-6 bg-gray-50  rounded-lg"
      style={{
        height: "100vh",
      }}
    >
      <p className="text-gray-500 text-lg font-medium mb-4">
        No conversations selected
      </p>
      <p className="text-gray-400 text-base">
        Select a conversation to view messages.
      </p>
    </div>
  );
};
