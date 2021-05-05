import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";

import Nav from "./Nav";
import Main from "./Main";
import Settings from "./Settings";
import Editor from "./Editor";
import AppInit from "./AppInit";
export default function App() {
  React.useEffect(async () => {
    await AppInit();

    window.addEventListener("focus", () => {
      const someStr = `
      hey
      
      
      there     woo,
      la
      he`;

      console.log(escape(someStr));
      console.log(unescape(someStr));
      console.log("%cWindow Focused!", "padding: 5px 10px; font-size: 20px;");
      console.log(`%c${__dirname}`, "padding: 10px 15px; font-size: 30px;");
    });
  }, []);

  return (
    <Flex flexDirection="column" minHeight="100vh">
      <HashRouter>
        <Nav />
        <Flex flex="1">
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/editor" component={Editor} />
          </Switch>
        </Flex>
        <footer className="toolbar toolbar-footer">
          <h1 className="title">Footer</h1>
        </footer>
      </HashRouter>
    </Flex>
  );
}
