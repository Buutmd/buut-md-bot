
const express = require("express");

const app = express();
app.use(express.json());

const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;

app.get("/", (req, res) => {
  res.send("Buut md Bot is running!");
});

app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }

  res.sendStatus(403);
});

app.post("/webhook", async (req, res) => {
  res.sendStatus(200);

  try {
    const messages =
      req.body.entry?.[0]?.changes?.[0]?.value?.messages;

    if (!messages) return;

    for (const message of messages) {
      if (message.type !== "text") continue;

      const sender = message.from;
      const text = message.text.body.toLowerCase().trim();

      let reply = "Thank you for messaging Buut md Bot! 😊";

      if (text === "hi" || text === "hello") {
        reply = "👋 Hello! Welcome to Buut md Bot ❤️";
      } else if (text === "help") {
        reply = "🤖 Welcome to Buut md! How can I help you?";
      } else if (text === "name") {
        reply = "My name is Buut md Bot ❤️";
      }

      await fetch(
        `https://graph.facebook.com/v26.0/${PHONE_NUMBER_ID}/messages`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: sender,
            type: "text",
            text: { body: reply }
          })
        }
      );
    }
  } catch (error) {
    console.error(error);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Buut md Bot is running!");
});
