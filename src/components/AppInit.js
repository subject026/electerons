import { ipcRenderer } from "electron";
import { generateKey } from "../services/PGP";
// import Main from "../services/Main";

const AppInit = async () => {
  let initInit;
  let users = false;
  // 1.read config
  const config = {};
  console.log("\n\n\nprocess.env.NODE_ENV: ", process.env.NODE_ENV, "\n\n\n");
  if (!config) {
    initInit = true;
  }
  console.log("INNNNNIT", await generateKey());
  ipcRenderer.on("respond-user-data", (event, data) => {
    console.log("%chere it is!!!", "font-size: 30px; color: green;", data);
  });
  ipcRenderer.send("request-user-data");
  // console.log("userData: ", userData);

  setTimeout(() => {
    const myNotification = new Notification("whoops", {
      subTitle: "foo lala",
      body: "Notification from the Renderer process",
      hasReply: true,
      urgency: "critical",
    });

    myNotification.onclick = () => {
      console.log("Notification clicked");
      ipcRenderer.send("notification-clicked", { bloop: "whoops" });
    };
  }, 2000);
};

export default AppInit;
