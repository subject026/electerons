import React, { Component } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/neat.css";
import { Box, Button } from "@chakra-ui/react";
import { connect } from "react-redux";
import { ipcRenderer } from "electron";

// import "./Editor.scss";
require("codemirror/mode/css/css");
require("codemirror/mode/javascript/javascript");
import "./Editor.css";
import fs from "fs";
export default class Editor extends Component {
  constructor() {
    super();
    this.state = {
      filePath: "",
      content: "",
    };

    this.timeOut = null;
  }

  saveFile = () => {
    const data = fs.writeFileSync(this.state.filePath, this.state.content);
    console.log(data);
  };

  handleChange = (editor, data, content) => {
    this.setState((state) => {
      return {
        ...state,
        content,
      };
    });
    if (!this.state.filePath) return;
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(this.saveFile, 1000);
    // this.debouncedUpdate(value);
  };

  // debouncedUpdate = debounce((value) => {
  //   this.props.updateCode(value);
  // }, 500);

  render() {
    const { content } = this.state;
    const { language } = this.props;
    const options = {
      lineNumbers: true,
      mode: language,
      lineWrapping: true,
      theme: "neat",
    };

    const handleOpenFileClick = () => {
      ipcRenderer.on("send-file-content", (event, { filePath, content }) => {
        console.log("filePath, content: ", filePath, content);
        this.setState({ filePath, content });
      });
      ipcRenderer.send("open-file-click");
    };

    return (
      <Box w="full">
        <Button
          bg={"blue.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}
          onClick={handleOpenFileClick}
        >
          open file
        </Button>
        <CodeMirror
          value={content}
          onBeforeChange={this.handleChange}
          options={options}
          className="CodeMirror"
        />
      </Box>
    );
  }
}
