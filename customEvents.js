const { ipcMain, app, dialog } = require("electron");
const fs = require("fs");
const axios = require("axios");
const openpgp = require("openpgp").generateKey;

module.exports = function (mainWindow) {
  ipcMain.on("request-user-data", async (event, arg) => {
    console.log("user data requested\n\n");
    const userPath = app.getPath("userData");
    console.log("userPath: ", userPath);
    const dirData = fs.readdirSync(userPath);

    console.log("(main) dirData: ", dirData);
    event.reply("respond-user-data", dirData);

    const keyy = await generateKey({
      curve: "curve25519",
      userIds: [{ name: name, email: email }],
      passphrase: password,
    });
    console.log("\n\n\nkey: ", key);
  });

  ipcMain.on("notification-clicked", () => {
    axios
      .get("google.com")
      .then((data) => {
        console.log({ data });
      })
      .catch((error) => console.log(error));

    app.focus();
  });

  ipcMain.on("open-file-click", async (event) => {
    let filePath;
    try {
      const { filePaths } = await dialog.showOpenDialog(mainWindow, {
        properties: ["openFile"],
        filters: [
          {
            name: "Markdown",
            extensions: ["md", "markdown"],
          },
        ],
      });

      if (!filePaths) return;

      filePath = filePaths[0];
    } catch (error) {
      console.log(error);
      return;
    }

    console.log("\nfilePath: ", filePath, "\n\n");
    const content = fs.readFileSync(filePath).toString();
    console.log(content);
    event.reply("send-file-content", { filePath, content });
  });
};
