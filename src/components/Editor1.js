import { Box } from "@chakra-ui/layout";
import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import store from "../store";

export default function Editor() {
  // const {
  //   editor: { content, options },
  // } = store.getState();
  const [state, setState] = React.useState({
    content: "woooooooo",
    options: {
      theme: "monokai",
      keyMap: "sublime",
      mode: "jsx",
    },
  });

  console.log(state);

  return (
    <Box p="4">
      <CodeMirror
        value={state.content}
        options={state.options}
        onBeforeChange={(editor, data, value) => {
          setState({ value });
        }}
        onChange={(editor, data, value) => {}}
      />
    </Box>
  );
}
