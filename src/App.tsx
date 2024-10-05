// components
import ChatApp from "./components/chatApp/ChatApp";

import { Client as Styletron } from "styletron-engine-monolithic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";

const engine = new Styletron();

function App() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <ChatApp />
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;
