const qrcode = require("qrcode-terminal");
const { Client, RemoteAuth, LocalAuth } = require("whatsapp-web.js");
const client = new Client({
  authStrategy: new LocalAuth(),
});

const initiateWhatsapp = () => {
  console.log("Initialting whatsapp...");
  client.initialize();
  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });

  client.on("authenticated", () => {
    console.log("AUTHENTICATED");
  });

  client.on("ready", () => {
    console.log("Client is ready!");
  });
  client.on("remote_session_saved", () => {
    console.log("Session saved!");
  });
  client.on("message", (message) => {
    if (
      message.body.toLocaleLowerCase() === "thank you" ||
      message.body.toLocaleLowerCase() === "thanks"
    ) {
      message.reply("You are welcome!");
    }
  });
};

client.on("message", (message) => {
  if (message.body === "hello") {
    message.reply("Hi");
  }
});
const sendWAppMsg = (number, messageText) => {
  // Send a message
  const chatId = "94" + number + "@c.us";
  client
    .sendMessage(chatId, messageText)
    .then((message) => {
      console.log("Message sent successfully to ", message.to);
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });
};

module.exports = { initiateWhatsapp, sendWAppMsg };
